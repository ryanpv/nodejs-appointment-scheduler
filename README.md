# NodeJS Appointment Scheduler

This app was developed to serve as backend for services that use appointment scheduling. It is built with ExpressJS and uses EJS view template to visualize how the app works. Users can simply book appointments without an account, but if they have an account they can keep track of all appointments they have booked with the specific service. With an account they would also be able to change/cancel an appointment through the app instead of calling the service provider. With nodemailer implementation, the app sends an email notification for any bookings/cancellations/changes. The app also has features for "admins" such as looking up any booked appointment and exporting daily appointments/schedule to an excel sheet if they wish to further organize the data.

## Features
* Book appointments by POST request using a basic form with required fields
* User sign up / login
* Change/cancel user booked appointments
* Send automatic email upon appointment bookings/cancellations/changes
* View list of appointments
* Query database for specific appointment
* Export data to excel sheet

## Technologies
* ExpressJS
* ESJ view template
* Firebase - user sign up / login
* Firebase-admin - user/token verification
* ExcelJS
* Nodemailer

## Potential future ideas/features
* Complete full stack application