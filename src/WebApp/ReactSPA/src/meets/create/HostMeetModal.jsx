import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form } from 'reactstrap'
import { TabContent, TabPane } from 'reactstrap'
import Loader from '../../shared/Loader';
import { useMutation } from 'react-query'
import axios from 'axios'
import SwalMessage from '../../shared/SwalMessage';
import MeetDetails from './MeetDetails';
import MeetRules from './MeetRules';
import EventRules from './EventRules';
import CoachesToInvite from './CoachesToInvite';


export default function HostMeetModal({modalState, toggle}) {
    const [activeTab, setActiveTab] = useState(1);

    // #region User Input States

    const [name, setName] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [date, setDate] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    })
    const [time, setTime] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [addressLine1, setAddressLine1] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [addressLine2, setAddressLine2] = useState({
        value: null,
        isValid: true,
        validationMesssage: ""
    });
    const [city, setCity] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [state, setState] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [zipCode, setZipCode] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [maxNumberOfIndividualEventsPerSwimmer, setMaxNumberOfIndividualEventsPerSwimmer] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [maxNumberOfRelayEventsPerSwimmer, setMaxNumberOfRelayEventsPerSwimmer] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [twoHundredYardMedleyRelay, setTwoHundredYardMedleyRelay] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [twoHundredYardFreestyle, setTwoHundredYardFreestyle] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [twoHundredYardIndividualMedley, setTwoHundredYardIndividualMedley] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [fiftyYardFreestyle, setFiftyYardFreestyle] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [oneMeterDiving, setOneMeterDiving] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [oneHundredYardButterfly, setOneHundredYardButterfly] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [oneHundredYardFreestyle, setOneHundredYardFreestyle] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [fiveHundredYardFreestyle, setFiveHundredYardFreestyle] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [twoHundredYardFreestyleRelay, setTwoHundredYardFreestyleRelay] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [oneHundredYardBackstroke, setOneHundredYardBackstroke] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [oneHundredYardBreaststroke, setOneHundredYardBreaststroke] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });
    const [fourHundredYardFreestyleRelay, setFourHundredYardFreestyleRelay] = useState({
        value: null,
        isValid: true,
        validationMessage: ""
    });

    const [coachesToInvite, setCoachesToInvite] = useState([]);

    //#endregion

    const mutation = useMutation({
        mutationFn: (newMeet) => {
            return axios.post('/meets/create', 
            JSON.stringify(newMeet), 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function () {
                toggle();
                SwalMessage("", false);
            }).catch(function (error) {
                SwalMessage(error.message, true)
            });
        }
    })

    // #region Validation
    function ValidateMeetDetailsAndLocation() {
        var areAllFieldsValid = true;

        if(!ValidateNotNullOrEmpty(name, setName, "Name")) areAllFieldsValid = false;
        if(!ValidateNotNullOrEmpty(addressLine1, setAddressLine1, "Address Line 1")) areAllFieldsValid = false;
        if(!ValidateNotNullOrEmpty(city, setCity, "City")) areAllFieldsValid = false;

        // State
        if(!ValidateNotNullAndInRange(state, setState, 2, 2, "State")) areAllFieldsValid = false;

        // Zip Code
        if(ValidateNotNullAndInRange(zipCode, setZipCode, 5, 5, "Zip Code")) {
            if(parseInt(zipCode.value) < 0) {
                setZipCode({
                    value: zipCode,
                    isValid: false,
                    validationMessage: "Invalid Zip Code."
                })
                areAllFieldsValid = false;
            }
        }
        else areAllFieldsValid = false;

        
        // Date/Time
        if(!ValidateNotNullOrEmpty(date, setDate, "Date is required.")) areAllFieldsValid = false;
        if(!ValidateNotNullOrEmpty(time, setTime, "Time is required.")) areAllFieldsValid = false;
        if(date.value != null && time.value != null) {
            var dateTime = new Date(date.value + ' ' + time.value);
            if(dateTime < new Date()) {
                setDate({
                    value: date.value,
                    isValid: false,
                    validationMessage: "Date/Time cannot be in the past."
                });
                setTime({
                    value: time.value,
                    isValid: false,
                    validationMessage: ""
                });
                areAllFieldsValid = false;
            }
        }
        else areAllFieldsValid = false;
        
        return areAllFieldsValid;
    }

    function ValidateMeetRules() {
        var areAllFieldsValid = true;

        if(!ValidateNotNullAndInRange(maxNumberOfIndividualEventsPerSwimmer,
             setMaxNumberOfIndividualEventsPerSwimmer,
             0, 99, "Max # of Individual Events Per Swimmer", "number"
             )) areAllFieldsValid = false;

        if (!ValidateNotNullAndInRange(maxNumberOfRelayEventsPerSwimmer,
            setMaxNumberOfRelayEventsPerSwimmer,
            0, 99, "Max # of Relay Events Per Swimmer", "number"
        )) areAllFieldsValid = false;

        return areAllFieldsValid;
    }

    function ValidateEventRules() {
        var areAllFieldsValid = true;

        if(!ValidateNotNullAndInRange(twoHundredYardMedleyRelay,
            setTwoHundredYardMedleyRelay,
             0, 99, "200-Yard Medley Relay", "number"
             )) areAllFieldsValid = false;

        if (!ValidateNotNullAndInRange(twoHundredYardFreestyle,
            setTwoHundredYardFreestyle,
            0, 99, "200-Yard Freetstyle", "number"
        )) areAllFieldsValid = false;

        if (!ValidateNotNullAndInRange(twoHundredYardIndividualMedley,
            setTwoHundredYardIndividualMedley,
            0, 99, "200-Yard Individual Medley", "number"
        )) areAllFieldsValid = false;

        if (!ValidateNotNullAndInRange(fiftyYardFreestyle,
            setFiftyYardFreestyle,
            0, 99, "50-Yard Freestyle", "number"
        )) areAllFieldsValid = false;

        if (!ValidateNotNullAndInRange(oneMeterDiving,
            setOneMeterDiving,
            0, 99, "1-Meter Diving", "number"
        )) areAllFieldsValid = false;

        if (!ValidateNotNullAndInRange(oneHundredYardButterfly,
            setOneHundredYardButterfly,
            0, 99, "100-Yard Butterfly", "number"
        )) areAllFieldsValid = false;

        if (!ValidateNotNullAndInRange(oneHundredYardFreestyle,
            setOneHundredYardFreestyle,
            0, 99, "100-Yard Freestyle", "number"
        )) areAllFieldsValid = false;

        if (!ValidateNotNullAndInRange(fiveHundredYardFreestyle,
            setFiveHundredYardFreestyle,
            0, 99, "500-Yard Freestyle", "number"
        )) areAllFieldsValid = false;

        if (!ValidateNotNullAndInRange(twoHundredYardFreestyleRelay,
            setTwoHundredYardFreestyleRelay,
            0, 99, "200-Yard Freestyle Relay", "number"
        )) areAllFieldsValid = false;

        if (!ValidateNotNullAndInRange(oneHundredYardBackstroke,
            setOneHundredYardBackstroke,
            0, 99, "100-Yard Backstroke", "number"
        )) areAllFieldsValid = false;

        if (!ValidateNotNullAndInRange(oneHundredYardBreaststroke,
            setOneHundredYardBreaststroke,
            0, 99, "100-Yard Breaststroke", "number"
        )) areAllFieldsValid = false;

        if (!ValidateNotNullAndInRange(fourHundredYardFreestyleRelay,
            setFourHundredYardFreestyleRelay,
            0, 99, "400-Yard Freestyle Relay", "number"
        )) areAllFieldsValid = false;

        return areAllFieldsValid;
    }

    function ValidateNotNullOrEmpty(state, setState, parameterName) {
        if(state == undefined || state == null) return false;

        if(state.value == null || state.value == '') {
            setState({
                value: state.value,
                isValid: false,
                validationMessage: parameterName + ' is required.'
            });
            return false;
        }

        return true;
    }

    function ValidateInRange(state, setState, min, max, parameterName, type = 'string') {
        if(state == undefined || state == null) return false;
        if(state.value == null) {
            setState({
                value: state.value,
                isValid: false
            });
            return false;
        }

        if(type === 'number' && !(min <= state.value && state.value <= max)) {
            setState({
                value: state.value,
                isValid: false,
                validationMessage: parameterName + ' must be within ' + min + '-' + max + '.'
            });
            return false;
        }

        if(type === 'string' && !(min <= state.value.length && state.value.length <= max)) {
            let validationMessage = min == max ? 
                parameterName + ' must be ' + min + ' characters.' 
                : parameterName + ' must be within ' + min + '-' + max + ' characters.';

            setState({
                value: state.value,
                isValid: false,
                validationMessage: validationMessage
            });
            return false;
        }

        return true;
    }

    function ValidateNotNullAndInRange(state, setState, min, max, parameterName, type = 'string') {
        if(ValidateNotNullOrEmpty(state, setState, parameterName) 
            && ValidateInRange(state, setState, min, max, parameterName, type)) return true;

        return false;
    }
    // #endregion


    function handleOnNextButtonClick(e) {
        e.preventDefault();

        switch(activeTab) {
            case 1:
                if(!ValidateMeetDetailsAndLocation()) return;
                break;
            case 2:
                if(!ValidateMeetRules()) return;
                break;
            case 3:
                if(!ValidateEventRules()) return;
                break;
            default:
                break;
        }

        if(activeTab == 4) {
            var newMeet = {
                Name: name.value,
                DateTime: new Date(date.value + ' ' + time.value),
                Location: {
                    AddressLine1: addressLine1.value,
                    AddressLine2: addressLine2.value,
                    City: city.value,
                    State: state.value,
                    ZipCode: zipCode.value
                },
                MaxNumberOfIndividualEventsPerSwimmer: maxNumberOfIndividualEventsPerSwimmer.value,
                maxNumberOfRelayEventsPerSwimmer: maxNumberOfRelayEventsPerSwimmer.value,
                // Probably not a good idea to hardcode the enums
                EventRules: [
                    {EventType: 1, MaxNumberOfEntriesPerTeam: twoHundredYardMedleyRelay.value},

                ],
                CoachesToInvite: coachesToInvite

            }
            mutation.mutate(newMeet);
            return;
        }

        setActiveTab(activeTab + 1);
    }

    function handleBackButtonClick(e) {
        e.preventDefault();

        if(activeTab == '1') {
            toggle();
            return;
        }

        setActiveTab(activeTab - 1);
    }


  return (
    <div>
      <Modal isOpen={modalState} toggle={toggle} onClosed={() => setActiveTab(1)}>
        <ModalHeader toggle={toggle}>Host a Meet</ModalHeader>
        <ModalBody>
            <Form style={{overflowY: 'auto', overflowX: 'hidden'}}>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId={1}>
                        <MeetDetails
                            meetDetails={{
                                name: name, setName: setName,
                                date: date, setDate: setDate,
                                time: time, setTime: setTime,
                                addressLine1: addressLine1, setAddressLine1: setAddressLine1,
                                addressLine2: addressLine2, setAddressLine2: setAddressLine2,
                                city: city, setCity: setCity,
                                state: state, setState: setState,
                                zipCode: zipCode, setZipCode: setZipCode
                            }}
                        />
                    </TabPane>
                    <TabPane tabId={2}>
                        <MeetRules 
                            meetRules={{
                                maxNumberOfIndividualEventsPerSwimmer: maxNumberOfIndividualEventsPerSwimmer,
                                setMaxNumberOfIndividualEventsPerSwimmer: setMaxNumberOfIndividualEventsPerSwimmer,
                                maxNumberOfRelayEventsPerSwimmer: maxNumberOfRelayEventsPerSwimmer,
                                setMaxNumberOfRelayEventsPerSwimmer: setMaxNumberOfRelayEventsPerSwimmer
                            }}
                        />
                    </TabPane>
                    <TabPane tabId={3}>
                        <EventRules 
                            eventRules={{
                                twoHundredYardMedleyRelay: twoHundredYardMedleyRelay, setTwoHundredYardMedleyRelay: setTwoHundredYardMedleyRelay,
                                twoHundredYardFreestyle: twoHundredYardFreestyle, setTwoHundredYardFreestyle: setTwoHundredYardFreestyle,
                                twoHundredYardIndividualMedley: twoHundredYardIndividualMedley, setTwoHundredYardIndividualMedley: setTwoHundredYardIndividualMedley,
                                fiftyYardFreestyle: fiftyYardFreestyle, setFiftyYardFreestyle: setFiftyYardFreestyle,
                                oneMeterDiving: oneMeterDiving, setOneMeterDiving: setOneMeterDiving,
                                oneHundredYardButterfly: oneHundredYardButterfly, setOneHundredYardButterfly: setOneHundredYardButterfly,
                                oneHundredYardFreestyle: oneHundredYardFreestyle, setOneHundredYardFreestyle: setOneHundredYardFreestyle,
                                fiveHundredYardFreestyle: fiveHundredYardFreestyle, setFiveHundredYardFreestyle: setFiveHundredYardFreestyle,
                                twoHundredYardFreestyleRelay: twoHundredYardFreestyleRelay, setTwoHundredYardFreestyleRelay: setTwoHundredYardFreestyleRelay,
                                oneHundredYardBackstroke: oneHundredYardBackstroke, setOneHundredYardBackstroke: setOneHundredYardBackstroke,
                                oneHundredYardBreaststroke: oneHundredYardBreaststroke, setOneHundredYardBreaststroke: setOneHundredYardBreaststroke,
                                fourHundredYardFreestyleRelay: fourHundredYardFreestyleRelay, setFourHundredYardFreestyleRelay: setFourHundredYardFreestyleRelay
                            }} 
                        />
                    </TabPane>
                    <TabPane tabId={4}>
                        <CoachesToInvite
                            coachesToInvite={coachesToInvite}
                            setCoachesToInvite={setCoachesToInvite}
                            modalState={modalState}
                        />
                    </TabPane>
                </TabContent>
            </Form>
        </ModalBody>
        <ModalFooter>
        <Button color="secondary" onClick={(e) => handleBackButtonClick(e)}>
            {activeTab == 1 ? (
                "Cancel"
            ) : (
                "Back"
            )}
          </Button>
          <Button color="primary" onClick={(e) => handleOnNextButtonClick(e)}>
            {activeTab == 4 ? (
                "Save"
            ) : (
                "Next"
            )}
          </Button>
        </ModalFooter>
      </Modal>

        <Loader isLoading={mutation.isLoading} />
    </div>
  );
}

