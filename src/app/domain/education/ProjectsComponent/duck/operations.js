import actions from "./actions";
import {
  createProjects,
  updateProjects,
  getProjects,
  deleteProjects,
  getProjectsById,
} from "../../../../api/projectsApi";

export const createProjectsOp = (projects) => {
  return (dispatch, getState) => {
    dispatch(actions.createProjectsRequest());
    return createProjects(projects)
      .then((returnedItem) => {
        dispatch(actions.createProjectsSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.createProjectsFail(e));
        return Promise.reject(e);
      });
  };
};

export const fetchProjectsOp = (formData) => {
  return (dispatch) => {
    dispatch(actions.getProjectsRequest());

    return getProjects(formData)
      .then((returnedItem) => {
        dispatch(actions.getProjectsSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getProjectsFail(e));
        Promise.resolve(e);
      });
  };
};
export const fetchProjectsById = (id) => {
  return (dispatch) => {
    dispatch(actions.getProjectsRequest());

    return getProjectsById(id)
      .then((returnedItem) => {
        dispatch(actions.getProjectsSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getProjectsFail(e));
        Promise.resolve(e);
      });
  };
};

export const updateProjectsOp = (projects) => {
  return (dispatch) => {
    dispatch(actions.updateProjectsRequest());
    return updateProjects(projects)
    .then((returnedItem) => {
        dispatch(actions.updateProjectsSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.updateProjectsFail(e));
        return Promise.reject(e);
      });
  };
};

export const deleteProjectsOp = (projects) => {
  return (dispatch) => {
    dispatch(actions.deleteProjectsRequest());
    return deleteProjects(projects)
      .then((returnedItem) => {
        dispatch(actions.deleteProjectsSuccess(projects));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.deleteProjectsFail(e));
        return Promise.reject(e);
      });
  };
};


const resetProjectsOp = () => {
  return (dispatch) => {
    return dispatch(actions.resetProjects());
  };
};

export default {
    resetProjectsOp,
    createProjectsOp,
    fetchProjectsOp,
    updateProjectsOp,
    deleteProjectsOp,
    fetchProjectsById,
};
