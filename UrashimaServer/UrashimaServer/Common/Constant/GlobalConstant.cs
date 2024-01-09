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

        public const string ManagementUnitHQ = "all";
    }

    public static class OriginConstant
    {
        private static readonly List<string> Globals = new()
        {
            "https://localhost:7053",
            "https://localhost:3000"
        };

        public static readonly List<string> WardOfficer = new(Globals) {
            "https://www.officer.urashima-ads.site",
            "http://localhost:2016"
        };

        public static readonly List<string> DistrictOfficer = new(Globals) {
            "https://www.officer.urashima-ads.site",
            "http://localhost:2016"
        };
        public static readonly List<string> HeadQuarter = new(Globals) {
            "https://www.hq.urashima-ads.site",
            "http://localhost:2021"
        };

        public static readonly List<(List<string>, string)> CheckList = new() {
            (WardOfficer, GlobalConstant.WardOfficer),
            (DistrictOfficer, GlobalConstant.DistrictOfficer),
            (HeadQuarter , GlobalConstant.HeadQuater)
        };
    }

    public static class RequestConstant
    {
        public const string Accepted = "accepted";
        public const string Rejected = "rejected";
        public const string Inprogress = "inprocess";
    }

    public static class ModifyRequestConstant
    {
        public const string Approve = "approve";
        public const string Deny = "deny";
    }
}
