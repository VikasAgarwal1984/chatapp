using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatServer.Hubs
{
    public class UserIdProvider : IUserIdProvider
    {
        public string GetUserId(HubConnectionContext connection)
        {
            return UserHandler.GetNextUserId;
            //return UserHandler.ConnectedIds.FirstOrDefault(x => x.ConnectionId == connection.ConnectionId)?.UserId;
        }
    }

    public class UserInfo
    {
        public string ConnectionId { get; set; }
        public string UserId { get; set; }
    }

    public static class UserHandler
    {
        static int count = 0;
        public static HashSet<UserInfo> ConnectedIds = new HashSet<UserInfo>();

        public static string GetNextUserId
        {
            get
            {

                return "U" + ++count;
            }
        }

        public static string GetCurrentUserId
        {
            get
            {
                return "U" + count;
            }
        }
    }

    public class ChatHub : Hub
    {

        public override Task OnConnectedAsync()
        {
            UserHandler.ConnectedIds.Add(new UserInfo { ConnectionId = Context.ConnectionId, UserId = UserHandler.GetCurrentUserId});
            Console.WriteLine($"connected, Connected users {UserHandler.ConnectedIds.Count}");
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            UserHandler.ConnectedIds.Remove(UserHandler.ConnectedIds.Where(x => x.ConnectionId == Context.ConnectionId).FirstOrDefault());
            Console.WriteLine($"Disconnect, Connected users {UserHandler.ConnectedIds.Count}");
            return base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string user, string message)
        {
            if(!string.IsNullOrEmpty(user))
            {
                await Clients.User(user).SendAsync("ReceiveMessage", user, message);
            }
            else
            {
                await Clients.All.SendAsync("ReceiveMessage", user, message);
            }
        }
    }
}
