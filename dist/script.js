

function closeForm() {
    document.getElementById("empform").style.display = "none";
    document.getElementById("navbar1").style.display = "block";
    document.getElementById("newform").reset(); // Optional: Reset form fields when closing
}


let flage = false;
function syz() {
    document.getElementById("empform").style.display = "block";
    flage = true;
    document.getElementById("navbar1").style.display = "none";
}

document.getElementById("newform").addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById("empform").style.display = "none";
    document.getElementById("navbar1").style.display = "block";
    

    let empid = document.getElementById("empId").value;
    let ename = document.getElementById("empName").value;
    let email = document.getElementById("empEmail").value;
    let empPhone = document.getElementById("empPhone").value;
    let empGender = document.getElementById("empGender").value;
    let empCompany = document.getElementById("empCompany").value;
    let empHireDate = document.getElementById("empHireDate").value;
    let empSalary = document.getElementById("empSalary").value;
    addEmp(empid, ename, email, empPhone, empGender, empCompany, empHireDate, empSalary);

})





// console.log("sujit")


let emp_List = [];

emp_List = localStorage.getItem("emplists") ? JSON.parse(localStorage.getItem("emplists")) : [];


function emp(empid, ename, email, phoneNo, Gender, company, hiredate, sal) {

    this.empid = empid;
    this.ename = ename;
    this.email = email;
    this.phoneNo = phoneNo;
    this.Gender = Gender;
    this.company = company;
    this.hiredate = hiredate;
    this.sal = sal;

}

// add information of a new emp
let addEmp = (empid, ename, email, phoneNo, Gender, company, hiredate, sal) => {
    let e = new emp(empid, ename, email, phoneNo, Gender, company, hiredate, sal);
    emp_List.push(e);
    console.log(emp_List)
    localStorage.setItem('emplists', JSON.stringify(emp_List));
    console.log()
    showAllEmpInfo(emp_List);
}




// print all emp info 
let showAllEmpInfo = (emp_Lists) => {
    let element ="";
    document.getElementById('tbody').innerHTML=element;

    // let emplist = JSON.parse(localStorage.getItem("empLists"));
    // console.log(emp_List)

    for (let i = 0; i < emp_Lists.length; i++) {
        element = `<tr class="text-center">
        <td>${emp_Lists[i].empid}</td>
        <td>${emp_Lists[i].ename}</td>
        <td>${emp_Lists[i].email}</td>
        <td>${emp_Lists[i].phoneNo}</td>
        <td>${emp_Lists[i].Gender}</td>
        <td>${emp_Lists[i].company}</td>
        <td>${emp_Lists[i].hiredate}</td>
        <td>${emp_Lists[i].sal}</td>
        </tr>`;
        // document.getElementById('tbody').style.display = "block";
        console.log("sujit")
        document.getElementById('tbody').insertAdjacentHTML("beforeend",element);
    }
    // console.log("sujit");

}
showAllEmpInfo(emp_List);


// print male employe 

let showMaleInfo=()=>{
    let maleemp=emp_List.filter((val,index)=>{
        console.log(val);
        if(emp_List[index].Gender=='Male') return val;
    })

   
    showAllEmpInfo(maleemp);
}


let showFemaleInfo=()=>{
    let maleemp=emp_List.filter((val,index)=>{
        console.log(val);
        if(emp_List[index].Gender=='Female') return val;
    })

   
    showAllEmpInfo(maleemp);
}

let shAllInfo=()=>{
    showAllEmpInfo(emp_List);
}



// Senior Employees Functionality
let showSeniorEmployees = () => {
    const currentDate = new Date();
    const seniorEmployees = emp_List.filter((emp) => {
        const hireDate = new Date(emp.hiredate);
        const yearsOfExperience = currentDate.getFullYear() - hireDate.getFullYear();
        return yearsOfExperience >= 20;
    });

    showAllEmpInfo(seniorEmployees);
};

// Enhanced Search Function
function searchEmp(entEmp, emps) {
    let filterEmps = [];
    for (let emp of emps) {
        let orgName = emp.ename.toLowerCase().trim();
        if (
            orgName.startsWith(entEmp) || 
            orgName.endsWith(entEmp) || 
            orgName.includes(entEmp)
        ) {
            filterEmps.push(emp);
        }
    }
    return filterEmps;
}

// Event Listener for Search
document.getElementById("searchName").addEventListener('keyup', () => {
    let enteredName = document.getElementById("searchName").value.toLowerCase().trim();
    let filteredEmployees = enteredName.length >= 1 ? searchEmp(enteredName, emp_List) : emp_List;

    showAllEmpInfo(filteredEmployees);
});
