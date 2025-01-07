using FormulaOne.ChatService.Models;
using Microsoft.AspNetCore.SignalR;
using FormulaOne.ChatService.DataService;

namespace FormulaOne.ChatService.Hubs;

public class ChatHub : Hub
{
    
    private readonly SharedDb _shared;
    
    public ChatHub(SharedDb shared) => _shared = shared;
    public async Task JoinChat(UserConnection conn)
    {
        await Clients.All.SendAsync("ReceiveMessage","admin", $"{conn.UserName} has joined the chat room");
        
    }

    public async Task JoinSpecificChatRoom(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);
        
        _shared.Connections[Context.ConnectionId] = conn;
        
        await Clients.Group(conn.ChatRoom)
            .SendAsync("JoinSpecificChatRoom", "admin", $"{conn.UserName} has joined the {conn.ChatRoom}");
    }

    public async Task SendMessage(string msg)
    {
        if (_shared.Connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
        {
            await Clients.Group(conn.ChatRoom)
                .SendAsync("ReceiveSpecificMessage", conn.UserName, msg);
        }
    }
}