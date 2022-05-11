import React, {useState} from "react";
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

function App() {
    const [taskInput, updateTaskInput] = useState("");
    const [toDoList, updateToDOList] = useState([]);

    const inputKeyDown = (event) => {
        if (event.keyCode === 13) addNote();
    };
    const addNote=()=>{
        if (!taskInput || !taskInput.length)
            return;
            updateToDOList((privious)=>{
          return [...privious,taskInput];
        });
        updateTaskInput("");
        updateToDOList((privious)=>{
          return(
            privious.sort()
          )
        })
      }


    const deleteTask=(id)=>{
        updateToDOList((privious)=>{
          return(
            privious.filter((ele,index)=>{
              return id!==index;
            })
          )
        })
      }

   


    const EditeAllTask=(id)=>{
        updateTaskInput(
            toDoList.filter((ele,index)=>{
            return id===index;
          })
        )
        updateToDOList((privious)=>{
          return(
            privious.filter((ele,index)=>{
              return id!==index;
            })
          )
        })

        
    
      }

    return (
        <div className="app-background">
            <p className="heading-text">React To Do List</p>
            <div className="task-container column">
                <div className="row">
                    <input
                        className="text-input"
                        value={taskInput}
                        onKeyDown={inputKeyDown}
                        onChange={(event) => updateTaskInput(event.target.value)}
                    />
                    <button className="add-button" onClick={addNote}>
                        ADD
                    </button>
                </div>
                {toDoList?.length ?
                    toDoList.map((toDoObject, index) =>
                        <ListItem key={index} itemData={toDoObject}
                                  index={index} deleteTask={deleteTask} EditeAllTask={EditeAllTask}/>) :
                    <p className="no-item-text"><span role="img" aria-label="react">📌</span> &nbsp;No Task Added !</p>}
            </div>
            
        </div>
    );
}

function ListItem(props) {
    return (
        <div className="list-item row jc-space-between">
            <span className={props.itemData.isComplete ? 'task-complete' : ''}
                  >&nbsp;{props.itemData}</span>
            <div>

            <button className="btn"
                 onClick={() => props.deleteTask(props.index)}><i className="fa fa-trash"/></button>
            <button className="btn"
                 onClick={() => props.EditeAllTask(props.index)}><i className="fa fa-edit"/></button>
            </div>
        </div>
    );
}

export default App;
