import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import { Col } from 'reactstrap'


export default function MeetRules({ meetRules }) {
    return (
        <div>
            <FormGroup>
                <Label
                    for="NewMaxNumberOfIndividualEventsPerSwimmer"
                    sm={12}
                >
                    Max # of Individual Events Per Swimmer
                </Label>
                <Col sm={3}>
                    <Input
                        id="NewMaxNumberOfIndividualEventsPerSwimmer"
                        name="NewMaxNumberOfIndividualEventsPerSwimmer"
                        type="number"
                        min={0}
                        max={99}
                        onChange={(e) => { 
                            meetRules.setMaxNumberOfIndividualEventsPerSwimmer({
                                value: e.target.value,
                                isValid: true,
                                validationMessage: ""
                            });
                        }}
                        invalid={!meetRules.maxNumberOfIndividualEventsPerSwimmer.isValid}
                    />
                    <FormFeedback>{meetRules.maxNumberOfIndividualEventsPerSwimmer.validationMessage}</FormFeedback>
                </Col>
            </FormGroup>   
            <FormGroup>
                <Label
                    for="NewMaxNumberOfRelayEventsPerSwimmer"
                    sm={12}
                >
                    Max Number of Relay Events Per Swimmer
                </Label>
                <Col sm={3}>
                    <Input
                        id="NewMaxNumberOfRelayEventsPerSwimmer"
                        name="NewMaxNumberOfRelayEventsPerSwimmer"
                        type="number"
                        min={0}
                        max={99}
                        onChange={(e) => { 
                            meetRules.setMaxNumberOfRelayEventsPerSwimmer({
                                value: e.target.value,
                                isValid: true,
                                validationMessage: ""
                            });
                        }}
                        invalid={!meetRules.maxNumberOfRelayEventsPerSwimmer.isValid}
                    />
                    <FormFeedback>{meetRules.maxNumberOfRelayEventsPerSwimmer.validationMessage}</FormFeedback>
                </Col>
            </FormGroup>           
        </div>
    )
}