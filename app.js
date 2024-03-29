(function () {
    const eleLis = document.querySelectorAll('header nav ul li.navItem');
    const card = document.querySelector('div.card-container');
    const btns = document.querySelectorAll('button');

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function() {
        //   console.log("You clicked:", this);
          btnClicked(this);
        });
    }

    const btnClicked = (assignedEle) =>{
        eleLis.forEach(element => {
            element.classList.remove('selected');
        });

        const parentEle = assignedEle.parentElement;
        // console.log('parentElement', parentEle);
       
        parentEle.classList.add('selected');
        const childSpanText = assignedEle.children[0].children[0].innerHTML;
        // console.log('childSpanText', childSpanText);
        card.className = 'card-' + childSpanText;
    };    
})();

const noUserFetched = 200;
const api = `https://randomuser.me/api/?results=${noUserFetched}`;

const fetchData = ()=>{
    fetch('https://randomuser.me/api/?results=200')
        .then((resp) => resp.json())
        .then(build)
        .catch((err)=>console.log('Error', err));
}

const build = (data)=>{
    // console.log('in', data);
    let users = data.results;
    // console.log(users);

    //This creates the students by get user with their age less than 55
    const students = users.filter(user => user.dob.age < 55);

    //This creates the students by get user with their age less than 55
    const lecturers = users.filter(user => (user.dob.age > 54 && user.dob.age <= 60));

    //This creates the students by get user with their age less than 55
    const phdLecturers = users.filter(user => (user.dob.age > 60 && user.dob.age <= 65));

    //This creates the students by get user with their age less than 55
    const profLecturers = users.filter(user => user.dob.age > 65);

    //Get our HOD - the oldest
    const profAges = profLecturers.map(prof => prof.dob.age);
    const oldestAge = Math.max(...profAges);
    const HOD = profLecturers.find(prof => prof.dob.age === oldestAge);

    //Remove HOD from profLecturers array
    const hodIndex = profLecturers.indexOf(HOD);
    profLecturers.splice(hodIndex,1);

    // console.log('students', students);
    // console.log('lecturers', lecturers);
    // console.log('phdLecturers', phdLecturers);
    // console.log('profLecturers', profLecturers);
    // console.log('HOD', HOD);

    appendElems('HOD', HOD);
    appendElems('profLecturers', profLecturers);
    appendElems('phdLecturers', phdLecturers);
    appendElems('lecturers', lecturers);
    appendElems('students', students);
}

//Append Elements
const appendElems = (role, arrObj) => {
    // Check to ensure array or object is not null or undefined
    if(arrObj != (null || undefined)){
        const parDiv = document.querySelector('div.card-1');

        //Check if it's an array or object
        if(Array.isArray(arrObj)){
            //Then it's an array
            if(arrObj.length != 0){
                const frag = document.createDocumentFragment();
                arrObj.forEach(element => {
                    frag.append(createElem(element, role));
                });
                parDiv.append(frag);
            }
        } else{
            //This is an Object
            parDiv.append(createElem(arrObj, role));
        }
    }
}

//Create card
const createElem = (element, role) => {
    let name_prefix =  '';
    let personRole =  '';

    if(role === 'students'){
        personRole = 'Student'; //I dont know whether ro use capitalize in CSS to handle person role
    } else{
        personRole = 'Lecturer';
        if (role == 'phdLecturers') {
            name_prefix = 'Dr. ';
        } else if (role == 'profLecturers' || role == 'HOD') {
            name_prefix = 'Prof. ';

            if(role == 'HOD'){
                personRole = 'Head of Department';
            }
        }
    }
    const div = document. createElement("div");
    div.classList.add("card", "center-card");
    div.innerHTML =  `<img src="${element.picture.large}" alt="Picture of ${name_prefix}${element.name.last} ${element.name.first}" class="person-img">
                <div class="person-details" data-role = "${personRole}">
                    <p class="person-name">${name_prefix}${element.name.last} ${element.name.first}</p>
                    <p class="person-role">${personRole}</p>
                </div>
                <div class="card-cover"></div>`;
    return div;
}

const startApp = () => {
    fetchData();
}

startApp();