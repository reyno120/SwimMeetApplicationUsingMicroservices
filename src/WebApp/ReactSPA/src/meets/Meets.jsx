//import { useQuery } from 'react-query';
//import UpcomingMeetCard from './UpcomingMeetCard';
//import PastMeetCard from './PastMeetCard';

//const getMeets = async () => {
//    const response = await fetch('Meet/GetAllMeets');
//    return await response.json();
//}

export default function Meets() {
    //const { isFetching, data, error } = useQuery("meets", getMeets);

    //if (isFetching) return 'Loading...'
    //if (error) return 'An error has occurred: ' + error.message

    return (
        <div>
            

            <div style={{ width: '100%', borderBottom: 'solid black 1px' }} >
                <p className="fs-5">Upcoming Meets</p>
            </div>

            <div className='container' >
                <div className='row gx-5 justify-content-between mt-3'>
                    {/*{data.filter((item) => {*/}
                    {/*    if (Date.parse(item.date) >= Date.now()) return true;*/}
                    {/*    return false;*/}
                    {/*}).map(meet =>*/}
                    {/*    <div key={meet.id} className='col-lg-4 col-sm-6 col-xs-12 m-auto'>*/}
                    {/*        <UpcomingMeetCard*/}
                    {/*            id={meet.id}*/}
                    {/*            name={meet.name}*/}
                    {/*            date={meet.date}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            </div>

            <div style={{ borderBottom: 'solid black 1px' }} className="w-100 mt-5">
                <p className="fs-5">Past Meets</p>
            </div>

            <div className='container' >
                <div className='row gx-5 justify-content-between mt-3'>
                    {/*{data.filter((item) => {*/}
                    {/*    if (Date.parse(item.date) < Date.now()) return true;*/}
                    {/*    return false;*/}
                    {/*}).map(meet =>*/}
                    {/*    <div key={meet.id} className='col-lg-4 col-sm-6 col-xs-12 m-auto'>*/}
                    {/*        <PastMeetCard*/}
                    {/*            id={meet.id}*/}
                    {/*            name={meet.name}*/}
                    {/*            date={meet.date}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            </div>
        </div>
    )
}