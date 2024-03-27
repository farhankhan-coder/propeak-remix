import React, { Component } from 'react';
import ProjectList from '../Components/project/project-list';
import * as projectservice from "../Services/project/project-service";
import * as projectcloneservice from "../Services/project/project-clone-service";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import * as validate from '../common/validate-entitlements';
import _ from 'lodash';
import config from '../common/config';

export default class ProjectMain extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      users: [],
      categories: [],
      isLoaded: false,
      userId: '',
      projectSearch: '',
      projectFilter: [],
      projectsSummary: [],
      isFavorite: false,
      favoriteProject: [],
      projectGroups: [
        { id: 'nogroup', desc: 'No Group' },
        { id: 'status', desc: 'Status' },
      ],
      selectedGroup: 'status',
      appLevelAccess: [],
      showProjectMenuIcons: false,
      showArchive: false,
    };

    // Bind methods
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.keyCheck = this.keyCheck.bind(this);
    this.searchProjects = this.searchProjects.bind(this);
    this.onGroupChanged = this.onGroupChanged.bind(this);
    this.onArchiveProjectById = this.onArchiveProjectById.bind(this);
    this.onDeleteProjectById = this.onDeleteProjectById.bind(this);
    this.onCloneProject = this.onCloneProject.bind(this);
    this.onClickAddFavoriteProject = this.onClickAddFavoriteProject.bind(this);
    this.onClickRemoveFavoriteProject = this.onClickRemoveFavoriteProject.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.toggleProjectMenuOptions = this.toggleProjectMenuOptions.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    }, this.checkArchive);
  }

  checkArchive() {
    this.props.context.actions.updateState("showArchive", this.state.showArchive);
    if (window.location.pathname.split('/').indexOf('favorites') === -1) {
      this.getAllProjectsSummary(this.state.showArchive);
    } else {
      this.getAllFavoriteProjects(this.state.showArchive);
    }
  }

  handleInputChange(event) {
    event.persist()
    this.setState({
      projectSearch: event.target.value
    })
    this.delayedCallback(event);
  }

  handleChangeCall(event) {
    this.setState({
      projectSearch: event.target.value
    })
    this.props.context.actions.updateState("projectSearch", event.target.value);
    if (event.target.value === '') {
      if (window.location.pathname.split('/').indexOf('favorites') === -1) {
        this.getAllProjectsSummary();
      } else {
        this.getAllFavoriteProjects(this.state.showArchive);
      }
    }
  }

  toggleProjectMenuOptions(id) {
    var obj = document.getElementById(id);
    obj.className = (obj.className.includes("hide-project-menu"))
      ? "project-icon-container  proj-icons-wrapper  justify-content-between show-project-menu"
      : "hide-project-menu";
  }

  keyCheck(e) {
    if (e.which === 13) {
      this.props.context.actions.updateState("projectSearch", this.state.projectSearch);
      this.searchProjects();
    }
  }

  searchProjects() {
    var projectFilter = Object.assign([], this.state.projectsSummary);
    let projectSearch = this.state.projectSearch.toLowerCase();
    var projects = [];
    projectFilter.filter((project) => {
      if (project.status && project.status.toLowerCase().indexOf(projectSearch) > -1) {
        projects.push(project);
      } else if (project.title.toLowerCase().indexOf(projectSearch) > -1) {
        projects.push(project);
      }
      return project;
    })

    this.props.context.actions.updateState("projectsSummary", projects);
    this.setState({
      projectsSummary: projects
    })
  }

  async getAllProjectsSummary() {
    let user = this.state.users.filter((u) => {
      return u._id === this.state.userId;
    });
    let userRole = user.length > 0 ? user[0].role : "";
    let { projects, projectErr } = await projectservice.getAllProjectsSummary(this.state.userId, userRole, this.state.showArchive);
    if (projectErr) {
      this.setState({
        message: projectErr
      });
    } else if (projects && projects.data.err) {
      this.setState({ message: projects.data.err });
    }
    else {
      await this.props.context.actions.updateState("projectsSummary", projects.data.data);
      this.props.context.actions.updateState("projectFilter", projects.data.data);
      this.setState({
        projectsSummary: projects.data.data,
        projectFilter: projects.data.data
      });
    }
  }

  async loadData() {
    await this.getAllProjectsSummary();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.context.state.users,
      categories: nextProps.context.state.categories,
      appLevelAccess: nextProps.context.state.appLevelAccess,
      projectSearch: nextProps.context.state.projectSearch,
      projectFilter: nextProps.context.state.projectFilter,
      showArchive: nextProps.context.state.showArchive
    });
  }

  async getAllFavoriteProjects() {
    let userId = Auth.get('userId');
    let { projects, projectErr } = await projectservice.getAllFavoriteProjects(userId, this.state.showArchive);
    if (projectErr) {
      this.setState({
        message: projectErr
      });
    } else if (projects && projects.data.err) {
      this.setState({ message: projects.data.err });
    }
    else {
      if (window.location.pathname.split('/').indexOf('favorites') > -1) {
        await this.props.context.actions.updateState("projectsSummary", projects.data.data);
        this.props.context.actions.updateState("projectFilter", projects.data.data);
        this.setState({
          projectsSummary: projects.data.data,
          projectFilter: projects.data.data
        });
      }
      this.setState({
        favoriteProject: projects.data.data
      });
    }
  }

  async componentDidMount() {
    if (this.state.users.length === 0) {
      this.props.context.actions.setUsers();
    }
    if (this.state.categories.length === 0) {
      this.props.context.actions.setCategories();
    }
    if (this.state.appLevelAccess.length === 0) {
      this.props.context.actions.getAppLevelAccessRights();
    }

    await this.props.context.actions.updateState("projectStatus", this.state.selectedGroup);
    this.getAllFavoriteProjects(this.state.showArchive);

    if (window.location.pathname.split('/').indexOf('favorites') === -1) {
      if (this.state.projectSearch === '') {
        this.getAllProjectsSummary();
      }
    }

    this.setState({
      isLoaded: false
    })
  }

  async onArchiveProjectById(id, type) {
    let archive;
    if (type === 'archive') {
      archive = true
    }
    else {
      archive = false
    }
    let { response, err } = await projectservice.archiveProject(id, archive);
    if (err) {
      this.setState({
        message: err,
        labelvalue: err
      });
    } else if (response && response.data.err) {
      this.setState({
        message: response.data.err,
        labelvalue: response.data.err
      });
    } else {
      if (window.location.pathname.split('/').indexOf('favorites') === -1) {
        this.loadData();
      }
      else {
        this.getAllFavoriteProjects(this.state.showArchive);
      }
    }
  }

  async onDeleteProjectById(id) {
    let { response, err } = await projectservice.deleteProject(id);
    if (err) {
      this.setState({
        message: err,
        labelvalue: err
      });
    } else if (response && response.data.err) {
      this.setState({
        message: response.data.err,
        labelvalue: response.data.err
      });
    } else {
      let projects = this.state.projectsSummary.filter((f) => {
        return id !== f._id
      });

      this.props.context.actions.updateState("projectsSummary", projects);
      this.setState({
        projectsSummary: projects
      })
    }
  }

  async onCloneProject(projectId) {

    if (window.confirm('Are you sure you want to clone this project?')) {
      let { response, err } = await projectcloneservice.addCloneProject(projectId);
      if (err) {
        this.setState({
          message: 'Error : ' + err,
          labelvalue: 'Error : ' + err,
        });
      } else if (response && response.data.err) {
        this.setState({
          message: 'Error : ' + response.data.err,
          labelvalue: 'Error : ' + response.data.err,
        });
      }
      else {

        let projects = Object.assign([], this.state.projectsSummary)
        projects.push(response.data)

        this.props.context.actions.updateState("projectsSummary", projects);
        this.setState({
          // projectFilter: projects,
          projectsSummary: projects
        })

      }
    }
  }

  async onClickAddFavoriteProject(projectId) {
    let userId = Auth.get('userId');
    let { response, err } = await projectservice.favoriteProject(projectId, userId);
    if (err) {
      this.setState({
        message: 'Error : ' + err,
        labelvalue: 'Error : ' + err
      });
    } else if (response && response.data.err) {
      this.setState({
        message: 'Error : ' + response.data.err,
        labelvalue: 'Error : ' + response.data.err,
        isFavorite: true
      });
    } else {
      this.getAllFavoriteProjects(this.state.showArchive);
    }
  }

  async onClickRemoveFavoriteProject(projectId) {
    let { response, err } = await projectservice.updateFavoriteProject(projectId);
    if (err) {
      this.setState({
        message: 'Error : ' + err,
        labelvalue: 'Error : ' + err
      });
    } else if (response && response.data.err) {
      this.setState({
        message: 'Error : ' + response.data.err,
        labelvalue: 'Error : ' + response.data.err,
        isFavorite: false
      });
    } else {
      let favoriteProject = this.state.favoriteProject.filter((f) => {
        return projectId !== f._id
      });
      if (window.location.pathname.split('/').indexOf('favorites') > -1) {
        await this.props.context.actions.updateState("projectsSummary", favoriteProject);
        this.props.context.actions.updateState("projectFilter", favoriteProject);
        this.setState({
          projectsSummary: favoriteProject,
          projectFilter: favoriteProject
        });
      }

      this.setState({
        favoriteProject: favoriteProject
      })
    }
  }

  async onGroupChanged(e) {
    let selectedGroup = e.target.value;

    this.setState({
      selectedGroup: selectedGroup
    });
    await this.props.context.actions.updateState("projectStatus", this.state.selectedGroup);
  }

  onDragStart(id, ev) {
    ev.dataTransfer.setData("text/plain", id);
  }

  onDrop(projectId, cat, ev) {
    ev.preventDefault();
    var projectId = ev.dataTransfer.getData("text");
    let projects = Object.assign([], this.state.projectsSummary);
    let project = projects.filter((p) => {
      return p._id === projectId;
    });
    if (project && project.length > 0 && project[0].status === cat) { return; } else {
      let updatedProjects = projects.map((project) => {
        if (project._id === projectId) {
          project.status = cat;
          this.updateProjectField(project);
        }
        return project;
      });
      this.setState({
        projectsSummary: updatedProjects
      });
    }
  }

  async updateProjectField(project) {
    let { response, err } = await projectservice.updateProjectField(project);
    if (err) {
      this.setState({
        message: 'Error: ' + err
      });
    } else if (response && response.data.err) {
      this.setState({
        message: 'Error: ' + response.data.err
      });
    }
  }

  render() {
    const { isLoaded, projectsSummary } = this.state;
    const { context } = this.props;
    
    // Check if context is defined
    const users = context && context.state ? context.state.users : [];
    const categories = context && context.state ? context.state.categories : [];
    const projectSearch = context && context.state ? context.state.projectSearch : '';
    const projectFilter = context && context.state ? context.state.projectFilter : [];
    const appLevelAccess = context && context.state ? context.state.appLevelAccess : [];
    const showArchive = context && context.state ? context.state.showArchive : false;

    let projects = this.state.projectsSummary;
    let userRole = Auth.get('role');

    return (
      <div className="main-content">
        <div className="inner-content">
          <div className="main-container">
            <div className="main-header">
              <div className="proj-header-wrapper">
                <h2 className="main-title">Projects</h2>
                <div className="searchbar">
                  <input type="text" id="projectSearch" name="projectSearch" value={projectSearch} placeholder="Search Project" onChange={this.handleInputChange} onKeyDown={this.keyCheck} />
                  <button className="search-btn" onClick={this.searchProjects}><i className="fa fa-search"></i></button>
                </div>
              </div>
            </div>

            <div className="main-body">
              <div className="filter-container">
                <div className="filter">
                  <input type="checkbox" id="showArchive" name="showArchive" checked={showArchive} onChange={this.handleChange} />
                  <label htmlFor="showArchive">Show Archive</label>
                </div>
              </div>

              <div className="projectlist-container">
                <ProjectList
                  projects={projects}
                  categories={categories}
                  users={users}
                  userRole={userRole}
                  appLevelAccess={appLevelAccess}
                  showArchive={showArchive}
                  onArchiveProjectById={this.onArchiveProjectById}
                  onDeleteProjectById={this.onDeleteProjectById}
                  onCloneProject={this.onCloneProject}
                  onClickAddFavoriteProject={this.onClickAddFavoriteProject}
                  onClickRemoveFavoriteProject={this.onClickRemoveFavoriteProject}
                  onDragStart={this.onDragStart}
                  onDrop={this.onDrop}
                  toggleProjectMenuOptions={this.toggleProjectMenuOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}














// import React, { Component } from 'react';
// import ProjectList from '../Components/project/project-list';
// import * as projectservice from "../Services/project/project-service";
// import * as projectcloneservice from "../Services/project/project-clone-service";
// import { Link } from 'react-router-dom';
// import Auth from '../utils/auth';
// import * as validate from '../common/validate-entitlements';
// import _ from 'lodash';
// import config from '../common/config';

// export default class ProjectMain extends Component {
//     constructor(props) {
//         super(props);
    
//         this.state = {
//           users: [],
//           categories: [],
//           isLoaded: false,
//           userId: '',
//           projectSearch: '',
//           projectFilter: [],
//           projectsSummary: [],
//           isFavorite: false,
//           favoriteProject: [],
//           projectGroups: [
//             { id: 'nogroup', desc: 'No Group' },
//             { id: 'status', desc: 'Status' },
//           ],
//           selectedGroup: 'status',
//           appLevelAccess: [],
//           showProjectMenuIcons: false,
//           showArchive: false,
//         };

//     this.onGroupChanged = this.onGroupChanged.bind(this);
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.keyCheck = this.keyCheck.bind(this);
//     this.searchProjects = this.searchProjects.bind(this);
//     this.onArchiveProjectById = this.onArchiveProjectById.bind(this);
//     this.onDeleteProjectById = this.onDeleteProjectById.bind(this);
//     this.onCloneProject = this.onCloneProject.bind(this);
//     this.onClickAddFavoriteProject = this.onClickAddFavoriteProject.bind(this);
//     this.onClickRemoveFavoriteProject = this.onClickRemoveFavoriteProject.bind(this);
//     this.onDragStart = this.onDragStart.bind(this);
//     this.onDrop = this.onDrop.bind(this);
//     this.delayedCallback = _.debounce(this.handleChangeCall, config.delayTime)
//     this.toggleProjectMenuOptions = this.toggleProjectMenuOptions.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(e) {
//     const target = e.target;
//     const value = target.type === 'checkbox' ? target.checked : target.value;
//     const name = target.name;
//     this.setState({
//       [name]: value
//     }, this.checkArchive)
//   }


//   checkArchive() {

//     this.props.context.actions.updateState("showArchive", this.state.showArchive);
//     if (window.location.pathname.split('/').indexOf('favorites') > -1 === false) {
//       this.getAllProjectsSummary(this.state.showArchive);
//     }
//     else {
//       this.getAllFavoriteProjects(this.state.showArchive)
//     }

//   }
//   handleInputChange(event) {
//     event.persist()
//     this.setState({
//       projectSearch: event.target.value
//     })

//     this.delayedCallback(event)

//   }

//   handleChangeCall(event) {
//     this.setState({
//       projectSearch: event.target.value
//     })
//     this.props.context.actions.updateState("projectSearch", this.state.projectSearch);
//     if (event.target.value === '') {

//       if (window.location.pathname.split('/').indexOf('favorites') > -1 === false) {
//         this.getAllProjectsSummary();
//       }
//       else {
//         this.getAllFavoriteProjects(this.state.showArchive);
//       }
//     }
//   }
//   //Todo: Rajesh: To be refactored
//   toggleProjectMenuOptions = (id) => {
//     var obj = document.getElementById(id);
//     obj.className = (obj.className.includes("hide-project-menu"))
//       ? "project-icon-container  proj-icons-wrapper  justify-content-between show-project-menu"
//       : "hide-project-menu";
//   }

//   keyCheck(e) {
//     if (e.which === 13) {
//       this.props.context.actions.updateState("projectSearch", this.state.projectSearch);
//       this.searchProjects();
//     }
//   }

//   searchProjects() {
//     var projectFilter = Object.assign([], this.state.projectsSummary);
//     let projectSearch = this.state.projectSearch.toLowerCase();
//     var projects = [];
//     projectFilter.filter((project) => {
//       if (project.status && project.status.toLowerCase().indexOf(projectSearch) > -1) {
//         projects.push(project);
//       } else if (project.title.toLowerCase().indexOf(projectSearch) > -1) {
//         projects.push(project);
//       }
//       return project;
//     })

//     this.props.context.actions.updateState("projectsSummary", projects);
//     this.setState({
//       // projectFilter: projects,
//       projectsSummary: projects
//     })
//   }

//   async getAllProjectsSummary() {
//     let user = this.state.users.filter((u) => {
//       return u._id === this.state.userId;
//     });
//     let userRole = user.length > 0 ? user[0].role : "";
//     let { projects, projectErr } = await projectservice.getAllProjectsSummary(this.state.userId, userRole, this.state.showArchive);
//     if (projectErr) {
//       this.setState({
//         message: projectErr
//       });
//     } else if (projects && projects.data.err) {
//       this.setState({ message: projects.data.err });
//     }
//     else {
//       await this.props.context.actions.updateState("projectsSummary", projects.data.data);
//       this.props.context.actions.updateState("projectFilter", projects.data.data);
//       this.setState({
//         projectsSummary: projects.data.data,
//         projectFilter: projects.data.data
//       });
//     }
//   }

//   async loadData() {
//     await this.getAllProjectsSummary();
//   }
//   componentWillReceiveProps(nextProps) {
//     this.setState({
//       users: nextProps.context.state.users,
//       categories: nextProps.context.state.categories,
//       appLevelAccess: nextProps.context.state.appLevelAccess,
//       projectSearch: nextProps.context.state.projectSearch,
//       projectFilter: nextProps.context.state.projectFilter,
//       showArchive: nextProps.context.state.showArchive
//     });
//   }

//   async getAllFavoriteProjects() {
//     let userId = Auth.get('userId');
//     let { projects, projectErr } = await projectservice.getAllFavoriteProjects(userId, this.state.showArchive);
//     if (projectErr) {
//       this.setState({
//         message: projectErr
//       });
//     } else if (projects && projects.data.err) {
//       this.setState({ message: projects.data.err });
//     }
//     else {
//       if (window.location.pathname.split('/').indexOf('favorites') > -1) {
//         await this.props.context.actions.updateState("projectsSummary", projects.data.data);
//         this.props.context.actions.updateState("projectFilter", projects.data.data);
//         this.setState({
//           projectsSummary: projects.data.data,
//           projectFilter: projects.data.data
//         });
//       }
//       this.setState({
//         favoriteProject: projects.data.data
//       });
//     }
//   }

//   async componentDidMount() {
//     if (this.state.users.length === 0) {
//       this.props.context.actions.setUsers();
//     }
//     if (this.state.categories.length === 0) {
//       this.props.context.actions.setCategories();
//     }
//     if (this.state.appLevelAccess.length === 0) {
//       this.props.context.actions.getAppLevelAccessRights();
//     }

//     // this.getAllUnHideNotification();
//     await this.props.context.actions.updateState("projectStatus", this.state.selectedGroup);
//     this.getAllFavoriteProjects(this.state.showArchive);

//     if (window.location.pathname.split('/').indexOf('favorites') > -1 === false) {

//       if (this.state.projectSearch === '') {
//         this.getAllProjectsSummary();
//       }
//     }

//     this.setState({
//       isLoaded: false
//     })
//   }
//   async onArchiveProjectById(id, type) {
//     let archive;
//     if (type === 'archive') {
//       archive = true
//     }
//     else {
//       archive = false
//     }
//     let { response, err } = await projectservice.archiveProject(id, archive);
//     if (err) {
//       this.setState({
//         message: err,
//         labelvalue: err
//       });
//     } else if (response && response.data.err) {
//       this.setState({
//         message: response.data.err,
//         labelvalue: response.data.err
//       });
//     } else {
//       if (window.location.pathname.split('/').indexOf('favorites') > -1 === false) {
//         this.loadData();
//       }
//       else {
//         this.getAllFavoriteProjects(this.state.showArchive);
//       }
//     }
//   }

//   async onDeleteProjectById(id) {
//     let { response, err } = await projectservice.deleteProject(id);
//     if (err) {
//       this.setState({
//         message: err,
//         labelvalue: err
//       });
//     } else if (response && response.data.err) {
//       this.setState({
//         message: response.data.err,
//         labelvalue: response.data.err
//       });
//     } else {
//       let projects = this.state.projectsSummary.filter((f) => {
//         return id !== f._id
//       });

//       this.props.context.actions.updateState("projectsSummary", projects);
//       this.setState({
//         projectsSummary: projects
//       })
//     }
//   }

//   async onCloneProject(projectId) {

//     if (window.confirm('Are you sure you want to clone this project?')) {
//       let { response, err } = await projectcloneservice.addCloneProject(projectId);
//       if (err) {
//         this.setState({
//           message: 'Error : ' + err,
//           labelvalue: 'Error : ' + err,
//         });
//       } else if (response && response.data.err) {
//         this.setState({
//           message: 'Error : ' + response.data.err,
//           labelvalue: 'Error : ' + response.data.err,
//         });
//       }
//       else {

//         let projects = Object.assign([], this.state.projectsSummary)
//         projects.push(response.data)

//         this.props.context.actions.updateState("projectsSummary", projects);
//         this.setState({
//           // projectFilter: projects,
//           projectsSummary: projects
//         })

//       }
//     }
//   }

//   async onClickAddFavoriteProject(projectId) {
//     let userId = Auth.get('userId');
//     let { response, err } = await projectservice.favoriteProject(projectId, userId);
//     if (err) {
//       this.setState({
//         message: 'Error : ' + err,
//         labelvalue: 'Error : ' + err
//       });
//     } else if (response && response.data.err) {
//       this.setState({
//         message: 'Error : ' + response.data.err,
//         labelvalue: 'Error : ' + response.data.err,
//         isFavorite: true
//       });
//     } else {
//       this.getAllFavoriteProjects(this.state.showArchive);
//     }
//   }

//   async onClickRemoveFavoriteProject(projectId) {
//     let { response, err } = await projectservice.updateFavoriteProject(projectId);
//     if (err) {
//       this.setState({
//         message: 'Error : ' + err,
//         labelvalue: 'Error : ' + err
//       });
//     } else if (response && response.data.err) {
//       this.setState({
//         message: 'Error : ' + response.data.err,
//         labelvalue: 'Error : ' + response.data.err,
//         isFavorite: false
//       });
//     } else {
//       let favoriteProject = this.state.favoriteProject.filter((f) => {
//         return projectId !== f._id
//       });
//       if (window.location.pathname.split('/').indexOf('favorites') > -1) {
//         await this.props.context.actions.updateState("projectsSummary", favoriteProject);
//         this.props.context.actions.updateState("projectFilter", favoriteProject);
//         this.setState({
//           projectsSummary: favoriteProject,
//           projectFilter: favoriteProject
//         });
//       }

//       this.setState({
//         favoriteProject: favoriteProject
//       })
//     }
//   }

//   async onGroupChanged(e) {
//     let selectedGroup = e.target.value;

//     this.setState({
//       selectedGroup: selectedGroup
//     });
//     await this.props.context.actions.updateState("projectStatus", this.state.selectedGroup);
//   }

//   onDragStart(id, ev) {
//     // console.log("ev", ev);
//     ev.dataTransfer.setData("text/plain", id);
//   }

//   onDrop(projectId, cat, ev) {
//     ev.preventDefault();
//     var projectId = ev.dataTransfer.getData("text");
//     let projects = Object.assign([], this.state.projectsSummary);
//     let project = projects.filter((p) => {
//       return p._id === projectId;
//     });
//     if (project && project.length > 0 && project[0].status === cat) { return; } else {
//       let updatedProjects = projects.map((project) => {
//         if (project._id === projectId) {
//           project.status = cat;
//           this.updateProjectField(project);
//         }
//         return project;
//       });
//       this.setState({
//         projectsSummary: updatedProjects
//       });
//     }
//   }

//   async updateProjectField(project) {
//     let { response, err } = await projectservice.updateProjectField(project);
//     if (err) {
//       this.setState({
//         message: 'Error: ' + err
//       });
//     } else if (response && response.data.err) {
//       this.setState({
//         message: 'Error: ' + response.data.err
//       });
//     }
//   }

//   render() {
//     const { isLoaded, projectsSummary, userId } = this.state;
//     const { context } = this.props;
//     // Check if context and context.state are defined before accessing properties
//     const users = context && context.state ? context.state.users : [];
//     const categories = context && context.state ? context.state.categories : [];
//     const projectSearch = context && context.state ? context.state.projectSearch : '';
//     const projectFilter = context && context.state ? context.state.projectFilter : [];
//     const appLevelAccess = context && context.state ? context.state.appLevelAccess : [];
//     const showArchive = context && context.state ? context.state.showArchive : false;
    

//  let projects = this.state.projectsSummary;
//     let userRole = Auth.get('userRole');

//     var projectList =
//       <ProjectList
//         projectId={""}
//         projects={projects}
//         group={this.state.selectedGroup}
//         users={this.props.context.state.users}
//         userId={this.state.userId}
//         categories={this.state.categories}
//         onDeleteProjectById={this.onDeleteProjectById}
//         onArchiveProjectById={this.onArchiveProjectById}
//         onCloneProject={this.onCloneProject}
//         onClickAddFavoriteProject={this.onClickAddFavoriteProject}
//         onClickRemoveFavoriteProject={this.onClickRemoveFavoriteProject}
//         projectsSummary={projects}
//         favoriteProject={this.state.favoriteProject}
//         onDragStart={this.onDragStart}
//         onDrop={this.onDrop}
//         appLevelAccess={this.state.appLevelAccess}
//         showProjectMenuIcons={this.state.showProjectMenuIcons}
//         toggleProjectMenuOptions={this.toggleProjectMenuOptions}
//       />

//     let groupList = [];

//     this.state.projectGroups.forEach(function (module, i) {
//       groupList.push(<option value={module.id} key={module.id}>{module.desc}</option>)
//     })

//     let createProject = validate.validateAppLevelEntitlements(this.state.appLevelAccess, 'Projects', 'Create');


//     return (
//       <div className="container ">
//         {this.state.isLoaded ?
//           <div className="logo">
//             <img src="/images/loading.svg" alt="loading" />
//           </div> :
//           <div>

//             <div className="row">
//               <div className="col-sm-12 col-lg-4">
//                 <div className="row ">
//                   <div className="col-7">


//                     <div className="row">
//                       <h4 className="project-total mt-2">Projects ({projects.length})
//                       &nbsp;
//                       {createProject ?
//                           <span title="new project" className="newProjectIcon">
//                             <Link to={'/project/create'} className="links" style={{
//                               lineHeight: "1.3em", color: 'rgb(255, 152, 0)',
//                               fontSize: '20px'
//                             }}>
//                               <i className="fas fa-plus"></i>
//                             </Link>
//                           </span>
//                           : null}
//                       </h4>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-sm-12 col-lg-2">
//                 {Auth.get('userRole') !== 'user' ?
//                   <span className="span-archive float-right"><label>Show Archive </label>&nbsp;
//                     <input type='checkbox' name="showArchive" onChange={this.handleChange} checked={this.state.showArchive} />
//                   </span>
//                   : '  '}
//               </div>
//               <div className="col-sm-12 col-lg-3 mt-2">
//                 <div className="row">
//                   <div className="input-group input-group mb-3 ">
//                     <div className="input-group-prepend">
//                       <span className="input-group-text rounded-0" id="inputGroup-sizing-sm"><i className="fas fa-sort-amount-down"></i></span>
//                     </div>
//                     <select className="form-control mr-lg-1 rounded-0" onChange={this.onGroupChanged}
//                       value={this.state.selectedGroup} placeholder="Select Group">
//                       {groupList}
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-sm-12 col-lg-3 mt-2">
//                 <div className="row">
//                   <div className="input-group input-group mb-3 mr-4">
//                     <input type="text" placeholder="Search Projects"
//                       value={this.state.projectSearch}
//                       name="projectSearch" className="form-control rounded-0 project-search" onChange={this.handleInputChange}
//                       onKeyPress={this.keyCheck} />
//                     <div className="input-group-prepend">
//                       <a className="input-group-text" id="inputGroup-sizing-sm" onClick={this.searchProjects}>
//                         <span role="img" aria-labelledby="Search">&#x1F50D;</span>
//                         {/* <span  className="fa fa-search"></span> */}
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="row project-list-scroll">
//               {projectList}
//             </div>
//           </div>
//         }
//       </div>
//     )
//   }
// }