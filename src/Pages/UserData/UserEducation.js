import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const UserEducation = () => {
    const [user] = useAuthState(auth);
    const [studying, setStudying] = useState(false);
    const navigate = useNavigate();

    const degreeRef = useRef('');
    const institutionRef = useRef('');
    const groupRef = useRef('');
    const startDateRef = useRef('');
    const studyingRef = useRef('');

    const hanleEducation = async event => {
        event.preventDefault();
        const degree = degreeRef.current.value;
        const institution = institutionRef.current.value;
        const edugroup = groupRef.current.value;
        const eduStartDate = startDateRef.current.value;
        const studying = studyingRef.current.checked;
        let eduEndDate;
        let eduStudying;
        if(!studying){
            eduEndDate = event.target.endDate.value;
            eduStudying = '';
        }
        else{
            eduStudying = 'Currently Studying';
            eduEndDate = ''
        };
        const education = {degree, institution, edugroup, eduStartDate, eduEndDate, eduStudying};
        const userContact = JSON.parse(localStorage.getItem('userContact'));
        const jobExp = JSON.parse(localStorage.getItem('jobExp'));

        const email = user?.email;
        const url = `http://localhost:5000/users/${email}`;
        await fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({userContact, jobExp, education})
        })
            .then(res => res.json())
            .then(data => { });
        localStorage.removeItem('userContact');
        localStorage.removeItem('jobExp');
        navigate('/');
    };

    return (
        <div class="flex justify-center bg-slate-100">
            <div className='lg:w-1/2 md:w-3/5 sm:w-4/5 w-11/12 bg-white sm:px-10 px-5 sm:py-8 py-5 h-max mt-8 mb-10 rounded-xl border shadow-lg'>
                <h1 className='text-center md:text-4xl sm:text-3xl text-2xl font-semibold mb-5'>Add Education</h1>
                <form onSubmit={hanleEducation}>
                    <div>
                        <div>
                            <label htmlFor='degree' className='font-medium sm:text-lg text-base'>Degree<span className='text-orange-600 ml-1'>*</span></label>
                            <input id='degree' ref={degreeRef} required type="text" placeholder="Ex: Bachelor's" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                        </div>
                        <div className='mt-5'>
                            <label htmlFor='institution' className='font-medium sm:text-lg text-base'>Institution<span className='text-orange-600 ml-1'>*</span></label>
                            <input id='institution' ref={institutionRef} required type="text" placeholder="Ex: Oxford University" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                        </div>
                        <div className='mt-5'>
                            <label htmlFor='group' className='font-medium sm:text-lg text-base'>Subject or Group<span className='text-orange-600 ml-1'>*</span></label>
                            <input id='group' ref={groupRef} required type="text" placeholder="Ex: Business" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                        </div>
                        <div className='flex justify-between'>
                            <div className='mt-5'>
                                <label htmlFor='startDate' className='font-medium sm:text-lg text-base'>Start date<span className='text-orange-600 ml-1'>*</span></label>
                                <input id='startDate' ref={startDateRef} required type="date" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                            </div>
                            {
                                studying ? '' :
                                    <div className='mt-5'>
                                        <label htmlFor='endDate' className='font-medium sm:text-lg text-base'>End date</label>
                                        <input name='endDate' id='endDate' type='date' className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </div>
                            }
                        </div>
                        <div className='md:mt-5 mt-3 flex items-center'>
                            <input id='checkbox' ref={studyingRef} onChange={() => setStudying(!studying)} type="checkbox" className="checkbox bg-white" />
                            <label className='text-base ml-3 cursor-pointer' htmlFor="checkbox">Currently studying</label>
                        </div>
                    </div>
                    <div className='mt-6 flex justify-between'>
                        <button onClick={()=>navigate('/')} className='btn btn-outline btn-primary sm:px-10 px-6 capitalize sm:text-lg text-base text-white h-0 sm:min-h-12 min-h-8'>Skip</button>
                        <button className='btn btn-primary sm:px-10 px-6 capitalize sm:text-lg text-base text-white h-0 sm:min-h-12 min-h-8' type="submit">Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserEducation;