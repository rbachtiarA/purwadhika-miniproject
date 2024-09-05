'use client'
import { PostEvent } from '@/app/interfaceType';
import FormDate from '@/components/event/formDate';
import FormikControl from '@/components/event/formikControl';
import FormProvinceCity from '@/components/event/formProvinceCity';
import FormTime from '@/components/event/formTime';
import { postEvent } from '@/lib/event';
import { Field, Form, Formik, FormikHelpers, FormikState } from 'formik';
import React, { FormEvent, useEffect, useState } from 'react'
import * as yup from 'yup';
import FormCatergory from './formCategory';

const createEventSchema = yup.object().shape({
    eventName: yup.string().required("Event must have name"),
    eventDateStart: yup.date().required("Event must have schedule start date"),
    eventDateEnd: yup.date().required("Event must have schedule end date").min(yup.ref('eventDateStart'), 'End date cannot before starting date'),
    eventTimeStart: yup.string().matches(/^(?:\d|[01]\d|2[0-3]):[0-5]\d$/, 'Time need HH:MM format').required('Event must have starting time'),
    eventTimeEnd: yup.string().matches(/^(?:\d|[01]\d|2[0-3]):[0-5]\d$/, 'Time need HH:MM format').required('Event must have end time'),
    eventAddress: yup.string().required('Event must have address'),
    eventCity: yup.number().min(1, 'You must select event city location')
})

export default function FormFormik({ mainData }: {mainData: {id: number, name:string, cities: { id: number, name: string }[]}[] }) {   
    const onCreate = async (data: PostEvent, action: FormikHelpers<PostEvent>) => {
        try {
            const { result, ok } = await postEvent(data)
            action.resetForm()
            console.log(result);
        } catch (error) {
            
        }
    }
  return (
    <>
        <section className='w-1/2 mx-auto p-4'>
            <h1 className='text-3xl text-center'>Create New Event</h1>
            <Formik
                initialValues={{
                    eventName: "",
                    eventCategory: "Music",
                    eventDateStart: `${(new Date()).toISOString().split('T')[0]}`,
                    eventDateEnd: "",
                    eventTimeStart: "00:00",
                    eventTimeEnd: "",
                    eventDescription: "",
                    eventAddress: "",
                    eventProvince: "11",
                    eventCity: 0,
                    eventPoster: "",
                    eventQuota: 0
                }}
                validationSchema={createEventSchema}
                onSubmit={(values, action) => {
                    console.log(values);
                    
                    onCreate(values, action);                
                } }
            >
                {
                    (props) => {         
                        const handleChangeProvince = (e: any) => {
                            props.values.eventCity = 0
                            props.handleChange(e)
                        }        

                        return (
                            <Form className='w-full mx-auto'>
                                <div className='[&_*]:w-full [&_label]:font-semibold'>
                                    <FormikControl control='input' name='eventName' label='Event name' className='bg-slate-200 rounded-md px-2 py-1 outline-none focus:ring-2' placeholder='Enter your event name'/>
                                    <FormikControl control='textarea' name='eventDescription' label='Event Description' className='bg-slate-200 rounded-md px-2 py-1 outline-none focus:ring-2' placeholder='Enter your event details here, ex: needed, rules, attribute, warnings, etc'/>
                                    <FormCatergory />
                                    <FormikControl control='number' min={0} name='eventQuota' label='Event Quota' className='bg-slate-200 rounded-md px-2 py-1 outline-none focus:ring-2' placeholder='Enter your event quota'/>
                                    
                                    <h2 className='font-semibold mt-4'>Event Date: </h2>
                                    <div className='p-4 border-2'>
                                        <FormDate className='bg-slate-200 px-2 py-1'/>
                                        <FormTime className='bg-slate-200 px-2 py-1'/>
                                    </div>

                                    <h2 className='font-semibold mt-4'>Event Location: </h2>
                                    <div className='p-4 border-2'>
                                        <FormikControl control='input' name='eventAddress' label='Event Address' className='bg-slate-200 rounded-md px-2 py-1 outline-none focus:ring-2' placeholder='Enter event location address'/>
                                        <FormProvinceCity mainData={mainData} provinceId={Number(props.values.eventProvince)} handleProvince={handleChangeProvince}/>                      
                                    </div>
                                    

                                    {/* <label htmlFor="eventPoster">Poster Image : </label>
                                    <Field name='eventPoster' id='eventPoster' type='file' accept='image/*'/> */}

                                    <label htmlFor="eventPoster">Poster Image : </label>
                                    <input 
                                        name='eventPoster' 
                                        id='eventPoster' 
                                        type='file' 
                                        accept='image/*' 
                                        onChange={(e) => {
                                            console.log(e.target.files);
                                            e.target.files instanceof FileList ?
                                            props.setFieldValue('eventPoster', e.target.files[0]) :
                                            'error'
                                        }}/>
                                    
                                </div>
                                
                                <button type='submit' className='w-1/2 bg-[rgb(77,170,212)] hover:bg-[rgb(44,96,121)] hover:text-white  shadow-md rounded-lg'>Submit</button>
                            </Form>
                        )
                    }
                }
            </Formik>
        </section>
    </>
  )
}
