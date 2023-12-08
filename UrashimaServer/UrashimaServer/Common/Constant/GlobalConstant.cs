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
}
