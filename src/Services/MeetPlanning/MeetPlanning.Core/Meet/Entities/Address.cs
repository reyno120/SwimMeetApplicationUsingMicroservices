using Ardalis.GuardClauses;
using MeetPlanning.Core.Common;

namespace MeetPlanning.Core.Meet.Entities
{
    public class Address : ValueObject
    {
        public string AddressLine1 { get; private set; }
        public string AddressLine2 { get; private set; }
        public string City { get; private set; }
        public string State { get; private set; }
        public string ZipCode { get; private set; }


        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return AddressLine1;
            yield return AddressLine2;
            yield return City;
            yield return State;
            yield return ZipCode;
        }

        public Address(string addressLine1, string addressLine2, string city, string state, string zipCode)
        {
            AddressLine1 = Guard.Against.NullOrEmpty(addressLine1);
            AddressLine2 = Guard.Against.NullOrEmpty(addressLine2);
            City = Guard.Against.NullOrEmpty(city);
            State = Guard.Against.NullOrEmpty(state);
            ZipCode = Guard.Against.OutOfRange(zipCode.Length, nameof(zipCode), 5, 5, "Invalid Zip Code.").ToString();
        }
    }
}

