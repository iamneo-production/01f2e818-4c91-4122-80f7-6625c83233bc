using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;

namespace dotnetapp.Services
{
    public class TrimmedKeysJsonConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return true;
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            JObject obj = JObject.Load(reader);
            var newObj = new JObject();

            foreach (var property in obj)
            {
                newObj.Add(property.Key.Trim(), property.Value);
            }

            return newObj.ToObject(objectType);
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            // Implement if you need serialization
            throw new NotImplementedException();
        }
    }
}