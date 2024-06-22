import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import { Row, Col } from 'reactstrap'

export default function MeetDetails({ meetDetails }) {
    var currentDate = new Date();
    const offset = currentDate.getTimezoneOffset();
    const minDateOffset = new Date(currentDate.getTime() - (offset*60*1000))
    const minDate = minDateOffset.toISOString().split('T')[0];

    return (
        <div>
            <FormGroup>
                <Label
                    for="NewMeetName"
                    sm={12}
                >
                    Name
                </Label>
                <Col sm={12}>
                    <Input
                        id="NewMeetName"
                        name="NewMeetName"
                        type="text"
                        maxLength={50}
                        onChange={(e) => { 
                            meetDetails.setName({
                                value: e.target.value,
                                isValid: true,
                                validationMessage: ""
                            });
                        }}
                        invalid={!meetDetails.name.isValid}
                    />
                    <FormFeedback>{meetDetails.name.validationMessage}</FormFeedback>
                </Col>
            </FormGroup>   
            <FormGroup>
                <Row className='justify-content-between'>
                    <Col sm={5} >
                        <Label
                            for="NewMeetDate"
                            sm={12}
                        >
                            Date
                        </Label>
                        <Input
                            id="NewMeetDate"
                            name="NewMeetDate"
                            type="date"
                            min={minDate}
                            onChange={(e) => { 
                                meetDetails.setDate({
                                    value: e.target.value,
                                    isValid: true,
                                    validationMessage: ""
                                });
                                meetDetails.setTime({
                                    value: meetDetails.time.value,
                                    isValid: true,
                                    validationMessage: ""
                                })
                            }}
                            invalid={!meetDetails.date.isValid}
                        />
                        <FormFeedback>{meetDetails.date.validationMessage}</FormFeedback>
                    </Col>
                    <Col sm={5}>
                        <Label
                            for="NewMeetTime"
                            sm={12}
                        >
                            Time
                        </Label>
                        <Input
                            id="NewMeetTime"
                            name="NewMeetTime"
                            type="time"
                            onChange={(e) => { 
                                meetDetails.setTime({
                                    value: e.target.value,
                                    isValid: true,
                                    validationMessage: ""
                                });
                                meetDetails.setDate({
                                    value: meetDetails.date.value,
                                    isValid: true,
                                    validationMessage: ""
                                });
                            }}
                            invalid={!meetDetails.time.isValid}
                        />
                        <FormFeedback>{meetDetails.time.validationMessage}</FormFeedback>
                    </Col>
                </Row>
            </FormGroup>   
            <FormGroup>
                <Label
                    for="NewMeetAddressLine1"
                    sm={12}
                >
                    Location
                </Label>
                <Input
                    id="NewMeetAddressLine1"
                    name="NewMeetAddressLine1"
                    type="text"
                    placeholder='Address Line 1'
                    maxLength={50}
                    onChange={(e) => { 
                        meetDetails.setAddressLine1({
                            value: e.target.value,
                            isValid: true,
                            validationMessage: ""
                        })
                    }}
                    invalid={!meetDetails.addressLine1.isValid}
                />
                <FormFeedback>{meetDetails.addressLine1.validationMessage}</FormFeedback>
            </FormGroup>   
            <FormGroup>
                <Input
                    id="NewMeetAddressLine2"
                    name="NewMeetAddressLine2"
                    type="text"
                    placeholder='Address Line 2'
                    maxLength={50}
                    onChange={(e) => { 
                        meetDetails.setAddressLine2({
                            value: e.target.value,
                            isValid: true,
                            validationMessage: ""
                        })
                    }}
                    invalid={!meetDetails.addressLine2.isValid}
                />
                <FormFeedback>{meetDetails.addressLine2.validationMessage}</FormFeedback>
            </FormGroup>        
                
            <FormGroup>
                <Row className='justify-content-between'>
                    <Col sm={6} className='mb-3'>
                        <Input
                            id="City"
                            name="City"
                            type="text"
                            placeholder='City'
                            maxLength={50}
                            onChange={(e) => { 
                                meetDetails.setCity({
                                    value: e.target.value,
                                    isValid: true,
                                    validationMessage: ""
                                })
                            }}
                            invalid={!meetDetails.city.isValid}
                        />
                        <FormFeedback>{meetDetails.city.validationMessage}</FormFeedback>
                    </Col> 
                    <Col sm={3} className='mb-3'>
                        <Input
                            id="State"
                            name="State"
                            type="text"
                            placeholder='State'
                            maxLength={2}
                            onChange={(e) => { 
                                meetDetails.setState({
                                    value: e.target.value,
                                    isValid: true,
                                    validationMessage: ""
                                })
                            }}
                            invalid={!meetDetails.state.isValid}
                        />
                        <FormFeedback>{meetDetails.state.validationMessage}</FormFeedback>
                    </Col>
                    <Col sm={3}>
                        <Input
                            id="ZipCode"
                            name="ZipCode"
                            type="number"
                            min={0}
                            max={99999}
                            placeholder='Zip Code'
                            onChange={(e) => { 
                                meetDetails.setZipCode({
                                    value: e.target.value,
                                    isValid: true,
                                    validationMessage: ""
                                })
                            }}
                            invalid={!meetDetails.zipCode.isValid}
                        />
                        <FormFeedback>{meetDetails.zipCode.validationMessage}</FormFeedback>
                    </Col>
                </Row>
            </FormGroup>
        </div>
    )
}
