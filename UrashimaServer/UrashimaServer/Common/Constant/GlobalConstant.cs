namespace UrashimaServer.Common.Constant
{
    public static class GlobalConstant
    {
        public const string User = "User";
        public const string WardOfficer = "WardOfficer";
        public const string DistrictOfficer = "DistrictOfficer";
        public const string HeadQuater = "HeadQuater";

        public static List<string> Roles = new List<string>()
        {
            "WardOfficer",
            "DistrictOfficer",
            "HeadQuater"
        };
    }

    public static class OriginConstant
    {
        private const string MyOrg = "https://localhost:7053";
        private const string MyOrg1 = "https://localhost:3000";

        public static readonly List<string> WardOfficer = new() {
            "http://officer.urashima-advertising.com",
            MyOrg,
            "http://localhost:2016"
        };
        public static readonly List<string> DistrictOfficer = new() {
            "http://officer.urashima-advertising.com",
            MyOrg,
            "http://localhost:2016"
        };
        public static readonly List<string> HeadQuater = new() {
            "http://hq.urashima-advertising.com",
            MyOrg,
            "http://localhost:2021"
        };

        private static readonly List<(List<string>, string)> list = new()
        {
            (WardOfficer, GlobalConstant.WardOfficer),
            (DistrictOfficer, GlobalConstant.DistrictOfficer),
            (HeadQuater , GlobalConstant.HeadQuater)
        };

        public static List<(List<string>, string)> CheckList = list;
    }

    public static class RequestConstant
    {
        public const string Accepted = "accepted";
        public const string Rejected = "rejected";
        public const string Inprogress = "inprocess";
    }
}
