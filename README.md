# Where's my lorry - An Intuitive Fleet Management System
>**Where's my lorry** is an **Automated Optical Recognition System**, made for **managing a fleet of vehicles**, that implements a low cost solution that is both easy to use and understand, while not losing precious functionalities that could be found in a system made by an industry leading company.

## Prerequisites
A **Process Manager** is needed in order to easily run this project, unless you use multiple (so far 2) instances of your cmd/terminal.

###### Use the following command to install **PM2**, which is the author's choice for a process manager. 

> `npm install pm2 -g |`

****
Testing was performed with **Forever**, but inconvenient bugs appeared so it was quickly replaced by **PM2**.

## Structure
Understanding the structure of this project is **essential** in order to ensure that it will work fully. The communication between the **Front-End (Website)** and the **Database** is made through a secondary **Node app** that acts as a server for the **Front-End**.

###### Path to **Back-End** (running on port 3001):
- root folder

###### Path to **Front-End** (running on port 3000):
- root/client

Both node apps will need their **dependencies** installed and processes **started seperately**.

## Installation
Clone this repository and travel to the paths for both the **Back-End** and **Front-End** in your cmd/terminal then use the **Node.js** command to install the dependencies.

OS X/Linux/Windows:

	npm install

## Usage
Use the following commands to start the processes. You will be able to identify them by the given names "Backend" and "Frontend". Make sure to first **navigate to their respective paths**.

    pm2 start npm --name "Backend"  -- start

    pm2 start npm --name "Frontend"  -- start 
    
###### To check the active processes use:

	pm2 list
    
###### To see the active website, navigate to:

	http://yourIP:3000
    
###### The Backend is restricted to the local IP. If you are using a server, remove this code from the page file present in the following path:

	root/routes
    
Remove/Comment out this piece of code

![Code](https://i.imgur.com/FSWMrgJ.png)

Visit this page in order to view it:

	http://ServerIP:3001/nameOfPage

## Example Website
[Example Website](https://wheresmylorry.tk/)
