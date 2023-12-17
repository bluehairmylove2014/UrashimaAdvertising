using System.Text;
using System.Text.RegularExpressions;
using UrashimaServer.Common.Constant;
using UrashimaServer.Models;

namespace UrashimaServer.Common.Helper
{
    public static class Helper
    {
        public static string ByteArrayToString(byte[] ba)
        {
            StringBuilder hex = new StringBuilder(ba.Length * 2);
            foreach (byte b in ba)
                hex.AppendFormat("{0:x2}", b);
            return hex.ToString();
        }

        public static byte[] StringToByteArray(String hex)
        {
            int NumberChars = hex.Length;
            byte[] bytes = new byte[NumberChars / 2];
            for (int i = 0; i < NumberChars; i += 2)
                bytes[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);
            return bytes;
        }

        public static bool IsUnderAuthority(string address, string managementUnit)
        => !string.IsNullOrEmpty(managementUnit) && Regex.IsMatch(address, $@"\b(?i){managementUnit}\b");

        public static bool IsAuthorizedOrigin(string origin, string role)
        => !OriginConstant.CheckList.Find(e => e.Item2.Equals(role))
            .Item1.Any(item => item.Equals(origin));

    }
}