namespace UrashimaServer.RealTime
{
    public interface IChatClient
    {
        Task AddMessage(string message);
    }
}
