import React, { useState } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap';
import { useQuery } from 'react-query';
import MarioImage from '../../images/mario.png';
import PeachImage from '../../images/Peach.png';
import LuigiImage from '../../images/luigi.png';

export default function CoachesToInvite({ coachesToInvite, setCoachesToInvite, modalState }) {
    const getCoaches = async () => {
        const response = await fetch(`coaches`);
        return await response.json();
      }
    
      const { isFetching, data, error } = useQuery("coach", () => getCoaches(), {enabled: modalState});

      return (
        <div>
            {isFetching ? 
                'Loading...' : error 
                ? 'An error has occurred: ' + error.message 
                : renderCoaches()}
        </div>
      );

      function handleClick(coachId) {
        if(coachesToInvite.includes(coachId)) {
            setCoachesToInvite(prevState => prevState.filter(id => id !== coachId));
            return;
        }

        setCoachesToInvite(prevState => [...prevState, coachId]);
      }

      function renderCoaches() {
        return (
          <ListGroup flush>
            {data.map(coach =>
              <ListGroupItem 
                active={coachesToInvite.includes(coach.id)} 
                action 
                key={coach.id} 
                className='d-flex align-items-center' 
                style={{cursor: 'pointer'}}
                onClick={() => handleClick(coach.id)}
                >
                {renderAvatar(coach.name)}
                <ListGroupItemText className='m-auto ms-2'>{coach.name}</ListGroupItemText>
              </ListGroupItem>
            )}
          </ListGroup>
        );
      }
    
      function renderAvatar(coachName) {
        if(coachName == 'Mario') return <MarioAvatar />
        if(coachName == 'Peach') return <PeachAvatar />
        if(coachName == 'Luigi') return <LuigiAvatar />
      }
}

function MarioAvatar() {
    return (
      <div className="rounded-circle border d-flex justify-content-center align-items-center d-inline"
        style={{width: '45px', height: '45px', overflow: 'hidden', float: 'left'}}
        alt="Avatar"
        >
          <img className='' style={{objectFit: 'contain', maxWidth: '100%', position: 'relative', top: '20px'}}
            src={MarioImage} />
      </div>
    )        
  }
  
  function PeachAvatar() {
    return (
      <div className="rounded-circle border d-flex justify-content-center align-items-center d-inline"
        style={{width: '45px', height: '45px', overflow: 'hidden', float: 'left'}}
        alt="Avatar"
        >
          <img className='' style={{objectFit: 'contain', maxWidth: '100%'}}
            src={PeachImage} />
      </div>
    )        
  }
  
  function LuigiAvatar() {
    return (
      <div className="rounded-circle border d-flex justify-content-center align-items-center d-inline"
        style={{width: '45px', height: '45px', overflow: 'hidden', float: 'left'}}
        alt="Avatar"
        >
          <img className='' style={{objectFit: 'contain', maxWidth: '100%', position: 'relative', top: '10px'}}
            src={LuigiImage} />
      </div>
    )        
  }