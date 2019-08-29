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