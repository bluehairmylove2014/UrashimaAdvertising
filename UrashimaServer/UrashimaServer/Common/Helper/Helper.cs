using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using UrashimaServer.Common.Constant;
using UrashimaServer.Middlewares;
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

        public static IEnumerable<KeyValuePair<string, object>> GetKeyValuePairs(object obj)
        {
            Type type = obj.GetType();

            PropertyInfo[] properties = type.GetProperties();

            // Iterate through properties and get key-value pairs
            foreach (var property in properties)
            {
                // Get the value of the property with null-check
                object value = property.GetValue(obj) ?? DBNull.Value;

                var kvp = new KeyValuePair<string, object>(property.Name, value);
                yield return kvp;
            }
        }

        public static bool IsUnderAuthority(string address, string managementUnit, string? region = null)
        {
            if (string.IsNullOrEmpty(region))
            {
                return Regex.IsMatch(address, $@"(?i){managementUnit}");
            }

            return Regex.IsMatch(address, $@"(?i){region}");
        }

        public static bool IsAuthorizedOrigin(string origin, string role)
        => !OriginConstant.CheckList.Find(e => e.Item2.Equals(role))
            .Item1.Any(item => item.Equals(origin));

    }
}