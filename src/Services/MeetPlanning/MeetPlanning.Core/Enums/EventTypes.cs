using System.ComponentModel;

namespace MeetPlanning.Core.Enums
{
    public enum EventType
    {
        [Description("200-Yard Medley Relay")]
        TwoHundredYardMedlyRelay = 0,

        [Description("200-Yard Freestyle")]
        TwoHundredYardFreestyle = 1,

        [Description("200-Yard Individual Medley")]
        TwoHundredYardIndividualMedly = 2,

        [Description("50-Yard Freestyle")]
        FiftyYardFreestyle = 3,

        [Description("1-Meter Diving")]
        OneMeterDiving = 4,

        [Description("100-Yard Butterfly")]
        OneHundredYardButterfly = 5,

        [Description("100-Yard Freestyle")]
        OneHundredYardFreestyle = 6,

        [Description("500-Yard Frestyle")]
        FiveHundredYardFreestyle = 7,

        [Description("200-Yard Freestyle Relay")]
        TwoHundredYardFreestyleRelay = 8,

        [Description("100-Yard Backstroke")]
        OneHundredYardBackstroke = 9,

        [Description("100-Yard Breaststroke")]
        OneHundredYardBreaststroke = 10,

        [Description("400-Yard Freestyle Relay")]
        FourHundredYardFreestyleRelay = 11,
    }
}
