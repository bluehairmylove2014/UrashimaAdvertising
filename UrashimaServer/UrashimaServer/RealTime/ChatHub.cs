using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using UrashimaServer.Common.Helper;
using UrashimaServer.Database;
using UrashimaServer.Database.Models;

namespace UrashimaServer.RealTime
{
    public class ChatHub : Hub<IChatClient>
    {
        private readonly DataContext _context;

        public ChatHub(DataContext context) {
            _context = context;
        }

        public async Task SendMessageToOfficer(string region, string message)
        {
            var accounts = await _context.Accounts
                .ToListAsync();
            accounts = accounts
                    .Where(acc => Helper.IsUnderAuthority(region, acc.UnitUnderManagement))
                    .ToList();

            var users = await _context.Users
                .Include(u => u.Connections)
                .ToListAsync();

            foreach (var account in accounts)
            {
                foreach (var user in users)
                {
                    if (user.Email.Equals(account.Email))
                    {
                        if (user.Connections != null)
                        {
                            foreach (var connection in user.Connections)
                            {
                                await Clients.Client(connection.ConnectionId)
                                    .AddMessage(message);
                            }
                        }
                    }
                }
            }
        }

        public async Task SendMessageToGuest(string message)
        {
            await Clients.Group("guests").AddMessage(message);
        }

        public override async Task OnConnectedAsync()
        {
            var email = Context.GetHttpContext()?.Request.Query["email"].ToString();

            if (!string.IsNullOrEmpty(email))
            {
                var user = _context.Users
                .Include(u => u.Connections)
                .SingleOrDefault(u => u.Email == email);

                if (user == null)
                {
                    user = new User
                    {
                        Email = email,
                        Connections = new List<Connection>()
                    };
                    _context.Users.Add(user);
                }

                user.Connections!.Add(new Connection
                {
                    ConnectionId = Context.ConnectionId,
                    UserAgent = Context.GetHttpContext()?.Request.Headers["User-Agent"],
                    Connected = true
                });

                await _context.SaveChangesAsync();
            } else
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, "guests");
            }

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? ex)
        {
            var email = Context.GetHttpContext()?.Request.Query["email"].ToString();
            var connection = _context.Connections.Find(Context.ConnectionId);

            // Remove officers' connection from the db
            if (connection != null) { 
                _context.Connections.Remove(connection);
            }

            // Remove guests from the guests group
            if (string.IsNullOrEmpty(email))
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, "guests");
            }

            await _context.SaveChangesAsync();
            await base.OnDisconnectedAsync(ex);
        }
    }
}
