

if(document.querySelector("html").dir == "rtl"){
    alertify.defaults.glossary.ok = 'موافق';
    alertify.defaults.glossary.cancel = 'إلغاء';
}


 
let tasks ; 

if( localStorage.getItem("tasks") == null ){
    tasks = [] ; 
}else {
   tasks =  JSON.parse(localStorage.getItem("tasks")); 
    showTasks()
}

function showDeleteAllBtn (){
    if(localStorage.getItem("tasks") == null || tasks.length== 0) {
        document.querySelector(".deleteAll-div").style.display = "none";
        document.querySelector(".noTasks").style.display = "flex";
        document.querySelector(".add-btn").style.display = "none" ;
    }else{
        document.querySelector(".deleteAll-div").style.display = "flex";
        document.querySelector(".noTasks").style.display = "none";
        document.querySelector(".add-btn").style.display = "flex" ;
    }
}

showDeleteAllBtn() ;




/**********************************************************************************************************/

// show tasks

function showTasks (){
    let tasksContainer = document.querySelector(".tasks") ; 
    let tasksDetails = "" ; 
    for(let i =0 ; i<tasks.length ; i++ ){
        tasksDetails += 
        ` <div class=" task ${tasks[i].isDone == true ? "doneTask" : ""}">
        <div class="task-info">
            <h2>${tasks[i].title}</h2>
            <div class="date-sec">
                <span class="date">${tasks[i].date}</span>
                <i class="fa-solid fa-calendar-days"></i>
            </div>
        </div>
        <div class="task-actions">
            ${ tasks[i].isDone == true ? `<button onclick= "toggleTaskCompletion(${tasks[i].id})" title="cancel" class="circle-btn notDoneBtn done-btn">
            <i class="fa-solid fa-xmark"></i>
            </button> ` :
             `<button onclick= "toggleTaskCompletion(${tasks[i].id})" title="done" class="circle-btn done-btn ">
                <i class="fa-solid fa-check"></i>
                </button>` }
            <button title="update" onclick= "updateTask(${tasks[i].id})" class="circle-btn update-btn">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button title="delete" onclick= "deleteTask(${tasks[i].id})"  class="circle-btn delete-btn">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    </div>`
    }
    tasksContainer.innerHTML = tasksDetails ;
    localStorage.setItem("tasks" ,JSON.stringify(tasks))
}



/**********************************************************************************************************/



// create Task

function createTask (){
    alertify.prompt( document.querySelector("html").dir == "rtl" ? 'مهمة جديدة' : "New task",  document.querySelector("html").dir == "rtl" ? ' الرجاء ادخال مهمة جديدة' : "please, enter new task name", ''
    , function(evt , value) {
        if(value == "") {
            if( document.querySelector("html").dir == "rtl"){
                alertify.alert('تنبيه','يجب ان تدخل اسم المهمة');
            }else{
                alertify.alert('Alert','You should enter the task name');
            }
           
        }else if (!isNaN(value)){
            if( document.querySelector("html").dir == "rtl"){
                alertify.alert('تنبيه','لا يجب ان يكون اسم المهمة عبارة عن ارقام فقط ');
            }else{
                alertify.alert('Alert','The task name should not be numbers only');
            }
        }else{
            let taskTitle =  value;
            let date = new Date() ;
            date =  date.toLocaleString() ;
            if(taskTitle){
                let taskObj = {
                    "id"  : tasks.length + 1  ,
                    "title" : taskTitle ,
                    "date" :  date , 
                    "isDone" : false
                  } ; 
                tasks.push(taskObj) ;
                showTasks()
                showDeleteAllBtn ()
                alertify.success( document.querySelector("html").dir == "rtl" ?  'تم اضافة المهمة بنجاح' : "Task added successfully" ,2.5); 
            }
        }
         }
    , function() {});
}

document.querySelector(".add-btn").addEventListener("click" , createTask)

/**********************************************************************************************************/


// delete task 


function deleteTask(taskId) {

    alertify.confirm(  document.querySelector("html").dir == "rtl" ?   'حذف مهمة ' : "delete task", 
    document.querySelector("html").dir == "rtl" ?   ' هل انت متأكد انك تريد حذف المهمة  ؟' : "Are you sure you want to delete this task?", function(){
        let newTasks =  tasks.filter((task)=>{
            return task.id != taskId
            })
            tasks = [...newTasks] ;
            showTasks()
            localStorage.setItem("tasks" , JSON.stringify(tasks)) ;
            showDeleteAllBtn () ;
            alertify.success(   document.querySelector("html").dir == "rtl" ?   'تم الحذف بنجاح' : "Deleted successfully" ,2.5);
    }, function(){});
}

/**********************************************************************************************************/


// update task 

function updateTask (taskId){
    alertify.prompt(  document.querySelector("html").dir == "rtl" ? ' تعديل مهمة' : "update task",
    document.querySelector("html").dir == "rtl" ?  ' الرجاء تعديل المهمة ' : "please update task", ''
    , function(evt, value) {
        if(value == ""){
            if( document.querySelector("html").dir == "rtl"){
                alertify.alert('تنبيه','يجب ان  تدخل اسم المهمة الجديد');
            }else{
                alertify.alert('Alert','You should enter the new task name');
            }
           
        } else if (!isNaN(value)){
            if( document.querySelector("html").dir == "rtl"){
                alertify.alert('تنبيه','لا يجب ان يكون اسم المهمة الجديد عبارة عن ارقام فقط ');
            }else{
                alertify.alert('Alert','The new task name does not have to be numbers only');
            }
        } else{
            let mytask = tasks.filter((task)=>{
                return task.id == taskId
                })
                let edited = value ;
                mytask[0].title = edited ;
                let date = new Date() ;
                date =  date.toLocaleString() ;
                mytask[0].date = date ;
                tasks = [...tasks] ;
                showTasks()
                localStorage.setItem("tasks" , JSON.stringify(tasks)) ;
                alertify.success(  document.querySelector("html").dir == "rtl" ?  'تم تعديل المهمة بنجاح' : "Task updated successfully" ,2.5);
        }
         }
    , function() {});
}


/**********************************************************************************************************/


// task is done 

function toggleTaskCompletion(taskId){
  let doneTask =   tasks.filter((task)=>{
       return task.id == taskId
    })
    doneTask[0].isDone  = !doneTask[0].isDone ;
    if(doneTask[0].isDone){
        alertify.success(  document.querySelector("html").dir == "rtl" ?  ' رائع! تم انجاز المهمة' : "Great! task has been accomplished" ,2.5);
        let date = new Date() ;
        date =  date.toLocaleString() ;
        doneTask[0].date = date ;
    }else{
        if( document.querySelector("html").dir == "rtl"){
            alertify.error(  'تم الرجوع عن المهمة'  ,2.5);
        }else{
            alertify.error(  'Task has been rolled back'  ,2.5);
        }
        let date = new Date() ;
        date =  date.toLocaleString() ;
        doneTask[0].date = date ;
       
    }
    
     tasks = [...tasks] ;
     showTasks()
    localStorage.setItem("tasks" , JSON.stringify(tasks)) ;
}


/**********************************************************************************************************/


// delete all tasks

function deleteAllTasks() {
    alertify.confirm(  document.querySelector("html").dir == "rtl" ?  'حذف جميع المهام' : "delete all tasks",  document.querySelector("html").dir == "rtl" ?  ' هل انت متأكد انك تريد حذف  جميع المهام  ؟' : "Are you sure you want to delete all tasks?", function(){
        tasks.length = 0 ; 
        showTasks();
        showDeleteAllBtn() ;
        alertify.success( document.querySelector("html").dir == "rtl" ? 'تم الحذف بنجاح' : "Deleted successfully"  ,2.5);
    }, function(){});
}