import React from 'react';
import { Label, Input, FormFeedback } from 'reactstrap'
import { Row, Col } from 'reactstrap'

export default function EventRules({ eventRules }) {
    return (
        <div>
            <h6 className='mb-5'>Max # of Entries per Team for each Event:</h6>
            <Row className='mb-3'>
                <Col xs={6}>
                    <Label
                        for="NewMaxTwoHundredYardMedleyRelayEntries"
                    >
                        100-Yard Medley Relay
                    </Label>
                </Col>
                <Col xs={3}>
                    <Input
                        size={3}
                        id="NewMaxTwoHundredYardMedleyRelayEntries"
                        name="NewMaxTwoHundredYardMedleyRelayEntries"
                        type="number"
                        min={0}
                        max={99}
                        onChange={(e) => {
                            eventRules.setTwoHundredYardMedleyRelay({
                                value: e.target.value,
                                isValid: true,
                                validationMessage: ""
                            });
                        }}
                    invalid={!eventRules.twoHundredYardMedleyRelay.isValid}
                    />
                    <FormFeedback>{eventRules.twoHundredYardMedleyRelay.validationMessage}</FormFeedback>
                </Col>
            </Row>   

            <Row className='mb-3'>
                <Col xs={6}>
                    <Label
                        for="NewMaxTwoHundredYardFreestyleEntries"
                    >
                        200-Yard Freestyle
                    </Label>
                </Col>
                <Col xs={3}>
                    <Input
                        id="NewMaxTwoHundredYardFreestyleEntries"
                        name="NewMaxTwoHundredYardFreestyleEntries"
                        type="number"
                        min={0}
                        max={99}
                        onChange={(e) => {
                            eventRules.setTwoHundredYardFreestyle({
                                value: e.target.value,
                                isValid: true,
                                validationMessage: ""
                            });
                        }}
                    invalid={!eventRules.twoHundredYardFreestyle.isValid}
                    />
                    <FormFeedback>{eventRules.twoHundredYardFreestyle.validationMessage}</FormFeedback>
                </Col>
            </Row>   

            <Row className='mb-3'>
                <Col xs={6}>
                    <Label
                        for="NewMaxTwoHundredYardIndividualMedleyEntries"
                    >
                        200-Yard Individual Medley
                    </Label>
                </Col>
                <Col xs={3}>
                    <Input
                        id="NewMaxTwoHundredYardIndividualMedleyEntries"
                        name="NewMaxTwoHundredYardIndividualMedleyEntries"
                        type="number"
                        min={0}
                        max={99}
                        onChange={(e) => {
                            eventRules.setTwoHundredYardIndividualMedley({
                                value: e.target.value,
                                isValid: true,
                                validationMessage: ""
                            });
                        }}
                    invalid={!eventRules.twoHundredYardIndividualMedley.isValid}
                    />
                    <FormFeedback>{eventRules.twoHundredYardIndividualMedley.validationMessage}</FormFeedback>
                </Col>
            </Row>  

            <Row className='mb-3'>
                <Col xs={6}>
                    <Label
                        for="NewMaxFiftyYardFreestyleEntries"
                    >
                        50-Yard Freestyle
                    </Label>
                </Col>
                <Col xs={3}>
                    <Input
                        id="NewMaxFiftyYardFreestyleEntries"
                        name="NewMaxFiftyYardFreestyleEntries"
                        type="number"
                        min={0}
                        max={99}
                        onChange={(e) => {
                            eventRules.setFiftyYardFreestyle({
                                value: e.target.value,
                                isValid: true,
                                validationMessage: ""
                            });
                        }}
                    invalid={!eventRules.fiftyYardFreestyle.isValid}
                    />
                    <FormFeedback>{eventRules.fiftyYardFreestyle.validationMessage}</FormFeedback>
                </Col>
            </Row>    

            <Row className='mb-3'>
                <Col xs={6}>
                    <Label
                        for="NewMaxOneMeterDivingEntries"
                    >
                        1-Meter Diving
                    </Label>
                </Col>
                <Col xs={3}>
                    <Input
                        id="NewMaxOneMeterDivingEntries"
                        name="NewMaxOneMeterDivingEntries"
                        type="number"
                        min={0}
                        max={99}
                        onChange={(e) => {
                            eventRules.setOneMeterDiving({
                                value: e.target.value,
                                isValid: true,
                                validationMessage: ""
                            });
                        }}
                    invalid={!eventRules.oneMeterDiving.isValid}
                    />
                    <FormFeedback>{eventRules.oneMeterDiving.validationMessage}</FormFeedback>
                </Col>
            </Row>    

            <Row className='mb-3'>
                <Col xs={6}>
                    <Label
                        for="NewMaxOneHundredYardButterflyEntries"
                    >
                        100-Yard Butterfly
                    </Label>
                </Col>
                <Col xs={3}>
                    <Input
                        id="NewMaxOneHundredYardButterflyEntries"
                        name="NewMaxOneHundredYardButterflyEnries"
                        type="number"
                        min={0}
                        max={99}
                        onChange={(e) => {
                            eventRules.setOneHundredYardButterfly({
                                value: e.target.value,
                                isValid: true,
                                validationMessage: ""
                            });
                        }}
                    invalid={!eventRules.oneHundredYardButterfly.isValid}
                    />
                    <FormFeedback>{eventRules.oneHundredYardButterfly.validationMessage}</FormFeedback>
                </Col>
            </Row> 

            <Row className='mb-3'>
                <Col xs={6}>
                    <Label
                        for="NewMaxOneHundredYardFreestyleEntries"
                    >
                        100-Yard Freestyle
                    </Label>
                </Col>
                <Col xs={3}>
                    <Input
                        id="NewMaxOneHundredYardFreestyleEntries"
                        name="NewMaxOneHundredYardFreestyleEntries"
                        type="number"
                        min={0}
                        max={99}
                        onChange={(e) => {
                            eventRules.setOneHundredYardFreestyle({
                                value: e.target.value,
                                isValid: true,
                                validationMessage: ""
                            });
                        }}
                    invalid={!eventRules.oneHundredYardFreestyle.isValid}
                    />
                    <FormFeedback>{eventRules.oneHundredYardFreestyle.validationMessage}</FormFeedback>
                </Col>
            </Row> 

            <Row className='mb-3'>
                <Col xs={6}>
                    <Label
                        for="NewMaxFiveHundredYardFreestyleEntries"
                    >
                        500-Yard Freestyle
                    </Label>
                </Col>
                <Col xs={3}>
                    <Input
                        id="NewMaxFiveHundredYardFreestyleEntries"
                        name="NewMaxFiveHundredYardFreestyleEntries"
                        type="number"
                        min={0}
                        max={99}
                        onChange={(e) => {
                            eventRules.setFiveHundredYardFreestyle({
                                value: e.target.value,
                                isValid: true,
                                validationMessage: ""
                            });
                        }}
                    invalid={!eventRules.fiveHundredYardFreestyle.isValid}
                    />
                    <FormFeedback>{eventRules.fiveHundredYardFreestyle.validationMessage}</FormFeedback>
                </Col>
            </Row> 

            <Row className='mb-3'>
                <Col xs={6}>
                    <Label
                        for="NewMaxTwoHundredYardFreestyleRelayEntries"
                    >
                        200-Yard Freestyle Relay
                    </Label>
                </Col>
                <Col xs={3}>
                    <Input
                        id="NewMaxTwoHundredYardFreestyleRelayEntries"
                        name="NewMaxTwoHundredYardFreestyleRelayEntries"
                        type="number"
                        min={0}
                        max={99}
                        onChange={(e) => {
                            eventRules.setTwoHundredYardFreestyleRelay({
                                value: e.target.value,
                                isValid: true,
                                validationMessage: ""
                            });
                        }}
                    invalid={!eventRules.twoHundredYardFreestyleRelay.isValid}
                    />
                    <FormFeedback>{eventRules.twoHundredYardFreestyleRelay.validationMessage}</FormFeedback>
                </Col>
            </Row> 

            <Row className='mb-3'>
                <Col xs={6}>
                    <Label
                        for="NewMaxOneHundredYardBackstrokeEntries"
                    >
                        100-Yard Backstroke
                    </Label>
                </Col>
                <Col xs={3}>
                    <Input
                        id="NewMaxOneHundredYardBackstrokeEntries"
                        name="NewMaxOneHundredYardBackstrokeEntries"
                        type="number"
                        min={0}
                        max={99}
                        onChange={(e) => {
                            eventRules.setOneHundredYardBackstroke({
                                value: e.target.value,
                                isValid: true,
                                validationMessage: ""
                            });
                        }}
                    invalid={!eventRules.oneHundredYardBackstroke.isValid}
                    />
                    <FormFeedback>{eventRules.oneHundredYardBackstroke.validationMessage}</FormFeedback>
                </Col>
            </Row> 

            <Row className='mb-3'>
                <Col xs={6}>
                    <Label
                        for="NewMaxOneHundredYardBreaststrokeEntries"
                    >
                        100-Yard Breaststroke
                    </Label>
                </Col>
                <Col xs={3}>
                    <Input
                        id="NewMaxOneHundredYardBreaststrokeEntries"
                        name="NewMaxOneHundredYardBreaststrokeEntries"
                        type="number"
                        min={0}
                        max={99}
                        onChange={(e) => {
                            eventRules.setOneHundredYardBreaststroke({
                                value: e.target.value,
                                isValid: true,
                                validationMessage: ""
                            });
                        }}
                    invalid={!eventRules.oneHundredYardBreaststroke.isValid}
                    />
                    <FormFeedback>{eventRules.oneHundredYardBreaststroke.validationMessage}</FormFeedback>
                </Col>
            </Row> 

            <Row className='mb-3'>
                <Col xs={6}>
                    <Label
                        for="NewMaxFourHundredYardFreestyleRelayEntries"
                    >
                        400-Yard Freestyle Relay
                    </Label>
                </Col>
                <Col xs={3}>
                    <Input
                        id="NewMaxFourHundredYardFreestyleRelayEntries"
                        name="NewMaxFourHundredYardFreestyleRelayEntries"
                        type="number"
                        min={0}
                        max={99}
                        onChange={(e) => {
                            eventRules.setFourHundredYardFreestyleRelay({
                                value: e.target.value,
                                isValid: true,
                                validationMessage: ""
                            });
                        }}
                    invalid={!eventRules.fourHundredYardFreestyleRelay.isValid}
                    />
                    <FormFeedback>{eventRules.fourHundredYardFreestyleRelay.validationMessage}</FormFeedback>
                </Col>
            </Row> 
        </div>
    )
}