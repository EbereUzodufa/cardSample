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
}

const startApp = () => {
    fetchData();
}

startApp();