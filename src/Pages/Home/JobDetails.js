import { CheckCircleIcon, XIcon } from '@heroicons/react/solid';
import React, { useRef } from 'react';
import axios from 'axios';
import { useState } from 'react';
import useGetUsers from '../../hooks/useGetUsers';
import './JobDetails.css';
import Spinner from '../Shared/Spinner';
import useGetApply from '../../hooks/useGetApply';
import BundledEditor from '../../BundledEditor';
import RequireAuth from '../Login/RequireAuth';

const JobDetails = ({ open }) => {
    const [usersData] = useGetUsers();
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = usersData[0];
    const [applied] = useGetApply(null);
    const editorRef = useRef(null);

    const {
        _id,
        publish,
        jobTitle,
        company,
        jobLocation,
        salary,
        empType,
        jobDescription,
        workplace,
        empQuantity,
        employerEmail,
        receiveEmail,
        skillTags
    } = open;

    const app = applied.filter(a => a.postID === _id);

    const handleApply = async event => {
        event.preventDefault();
        setLoading(true)
        const resume = user?.resume;
        const subject = event.target.subject.value;
        const coverLetter = editorRef.current.getContent();
        const seekerEmail = user?.email;
        const seekerName = user?.firstName + ' ' + user?.lastName;
        const postID = _id;

        const date = new Date();
        const applied = date.getDate() + '-' + date.toLocaleString('default', { month: 'long' }) + '-' + date.getFullYear();
        await axios.post('https://boiling-beach-14928.herokuapp.com/apply',
            { resume, subject, coverLetter, seekerEmail, seekerName, postID, receiveEmail, applied, jobTitle })
            .then(function (response) {
                setLoading(false);
                setModal(false)
            })
            .catch(function (error) { });
    };

    return (<>
        <div className="rounded-lg border shadow-md sticky top-6 h-screen overflow-y-auto scrollBar">
            <div className="card-body sm:p-6 p-3">
                <h1 className='text-2xl font-bold text-center'>Job Details</h1>
                <div className='flex justify-between'>
                    <span className='text-accent text-sm tracking-wide'>Published: {publish}</span>{
                        app[0] === undefined ?
                            <button
                                onClick={() => setModal(true)}
                                className='btn btn-primary min-h-0 sm:h-11 h-10 normal-case text-base text-white px-6 tracking-wider'>
                                Apply
                            </button> :
                            <h4 className='text-success text-base flex items-center'>
                                <CheckCircleIcon className='w-6 h-6 mr-1'></CheckCircleIcon>Applied
                            </h4>
                    }
                </div>
                <h2 className="text-2xl font-medium">{jobTitle}</h2>
                <h5 className='font-medium'>{company}</h5>
                <h5 className='font-medium'>Location :
                    <span className='text-base font-normal ml-2'>{jobLocation}</span>
                </h5>
                <h5 className='font-medium'>Salary :
                    <span className='text-base font-normal ml-2'>${salary}</span>
                </h5>
                <h5 className='font-medium'>Job Type :
                    <span className='text-base font-normal ml-2'>{empType}</span>
                </h5>
                <h5 className='font-medium'>Employees Quantity :
                    <span className='text-base font-normal ml-2'>{empQuantity}</span>
                </h5>
                <span className='bg-slate-200 px-2 py-1 rounded w-max'>{workplace}</span>
                <hr />
                <div className='mb-10' dangerouslySetInnerHTML={{ __html: jobDescription }}></div>
            </div>
        </div>
        {
            modal && <RequireAuth>
                <div className='w-full h-screen flex items-center justify-center fixed top-0 left-0 bg-black/50 z-10'>
                    <div className='xl:w-1/2 md:w-3/5 sm:w-4/5 w-11/12 h-max sm:px-10 px-5 bg-white rounded-md shadow-2xl relative'>
                        <button
                            onClick={() => setModal(false)}
                            className='absolute top-3 right-5 w-8 h-8 hover:bg-gray-200 hover:rounded-full duration-300 p-1'>
                            <XIcon></XIcon>
                        </button>
                        <div className='py-3 border-b-2'>
                            <h1 className='text-xl font-medium'>Apply to {company}</h1>
                        </div>
                        <div className='py-2'>
                            <h2 className='text-lg font-medium'>CV / Resume</h2>
                            <iframe title='Resume' className='mt-2' src={user?.resume}></iframe>
                        </div>
                        <div className='py-2'>
                            <h2 className='text-lg font-medium mb-1'>Add cover letter
                                <span className='text-orange-600 ml-1'>*</span>
                            </h2>
                            <form onSubmit={handleApply}>
                                <input
                                    required
                                    type="text"
                                    placeholder="Subject"
                                    name='subject'
                                    className="input h-9 text-base w-full mb-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                                />
                                <BundledEditor
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue={
                                        'Write cover letter'
                                    }
                                    required
                                    init={{
                                        height: 200,
                                        menubar: false,
                                        toolbar: false,
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; letter-spacing: 1px; line-height: 20px; margin-top:0}',
                                        statusbar: false,
                                    }}

                                />
                                <button disabled={loading} className='btn btn-outline my-5 min-h-0 h-10 normal-case text-lg tracking-wider px-10'>{loading ? <Spinner /> : 'Send'}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </RequireAuth>
        }
    </>);
};

export default JobDetails;