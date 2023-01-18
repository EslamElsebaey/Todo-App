

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
    
    alertify.prompt( 'مهمة جديدة', ' الرجاء ادخال مهمة جديدة', ''
    , function(evt, value) {
        document.querySelector(".ajs-ok").innerHTML = "نعم" ;
    document.querySelector(".ajs-cancel").innerHTML = "الغاء" ;
        if(value == "") {
            alertify.alert('تنبيه','يجب ان تدخل اسم المهمة');
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
                alertify.success('تم اضافة المهمة بنجاح' , 2); 
            }
        }
         }
    , function() {});
}

document.querySelector(".add-btn").addEventListener("click" , createTask)

/**********************************************************************************************************/


// delete task 


function deleteTask(taskId) {

    alertify.confirm('حذف مهمة ', ' هل انت متأكد انك تريد حذف المهمة  ؟', function(){
        let newTasks =  tasks.filter((task)=>{
            return task.id != taskId
            })
            tasks = [...newTasks] ;
            showTasks()
            localStorage.setItem("tasks" , JSON.stringify(tasks)) ;
            showDeleteAllBtn () ;
            alertify.success('تم الحذف بنجاح' , 2);
    }, function(){});
}

/**********************************************************************************************************/


// update task 

function updateTask (taskId){
    alertify.prompt( ' تعديل مهمة', ' الرجاء تعديل المهمة  ', ''
    , function(evt, value) {

        if(value == ""){
            alertify.alert('تنبيه','يجب ان  تدخل اسم المهمة الجديد');
        }else{
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
                alertify.success('تم تعديل المهمة بنجاح' , 2);
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
        alertify.success('تم انجاز المهمة' , 2);
    }else{
        alertify.success('تم الرجوع عن المهمة' , 2);
    }
     tasks = [...tasks] ;
     showTasks()
    localStorage.setItem("tasks" , JSON.stringify(tasks)) ;
}


/**********************************************************************************************************/


// delete all tasks

function deleteAllTasks() {
    alertify.confirm('حذف جميع المهام', ' هل انت متأكد انك تريد حذف  جميع المهام  ؟', function(){
        tasks.length = 0 ; 
        showTasks();
        showDeleteAllBtn() ;
        alertify.success('تم الحذف بنجاح' , 2);
    }, function(){});
}