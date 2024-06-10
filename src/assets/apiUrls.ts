export default {
  users: {
    createPath: `user/signup`,
    login: `user/login`,
    getAllUsers: ({ page, pageSize, search }) =>
      `user/getAllUsers?page=${page}&pagesize=${pageSize}&search=${search}`,
    forgotPassword: `user/forgot-password`,
    setPassword: `user/set-password`,
    resetPassword: `user/reset-password`,
    updatePath: (id) => `user/update?id=${id}`,
    profile: (id) => `user/profile?id=${id}`,
    deletePath: (id) => `user/delete/${id}`,
  },
  images: {
    createPath: `images/create`,
    getAllPath: ({ page, pageSize, search }) =>
      `images/getAll?page=${page}&pagesize=${pageSize}&search=${search}`,
    updatePath: (id) => `images/update/${id}`,
    getByIdPath: (id) => `images/getById/${id}`,
    deletePath: (id) => `images/delete/${id}`,
  },
  notifications: {
    createPath: `notification/create`,
    getAllPath: ({ page, pageSize, search }) =>
      `notification/getAll?page=${page}&pagesize=${pageSize}&search=${search}`,
    updatePath: (id) => `notification/update/${id}`,
    getByIdPath: (id) => `notification/getById/${id}`,
    deletePath: (id) => `notification/delete/${id}`,
  },
  university: {
    createPath: `university/create`,
    getAllPath: `university/getAll`,
    updatePath: (id) => `university/update/${id}`,
    getByIdPath: (id) => `university/getById/${id}`,
    deletePath: (id) => `university/delete/${id}`,
  },
  college: {
    createPath: `college/create`,
    getAllPath: `college/getAll`,
    updatePath: (id) => `college/update/${id}`,
    getByIdPath: (id) => `college/getById/${id}`,
    deletePath: (id) => `college/delete/${id}`,
  },
  branch: {
    createPath: `branch/create`,
    getAllPath: `branch/getAll`,
    updatePath: (id) => `branch/update/${id}`,
    getByIdPath: (id) => `branch/getById/${id}`,
    deletePath: (id) => `branch/delete/${id}`,
  },
  collegeBranchMapping: {
    createPath: `collegeBranchMapping/create`,
    getAllPath: `collegeBranchMapping/getAll`,
    updatePath: (id) => `collegeBranchMapping/update/${id}`,
    getByIdPath: (id) => `collegeBranchMapping/getById/${id}`,
    deletePath: (id) => `collegeBranchMapping/delete/${id}`,
  },
  semester: {
    createPath: `semester/create`,
    getAllPath: `semester/getAll`,
    updatePath: (id) => `semester/update/${id}`,
    getByIdPath: (id) => `semester/getById/${id}`,
    deletePath: (id) => `semester/delete/${id}`,
  },
  branchSemesterMapping: {
    createPath: `branchSemesterMapping/create`,
    getAllPath: `branchSemesterMapping/getAll`,
    updatePath: (id) => `branchSemesterMapping/update/${id}`,
    getByIdPath: (id) => `branchSemesterMapping/getById/${id}`,
    deletePath: (id) => `branchSemesterMapping/delete/${id}`,
  },
  subject: {
    createPath: `subject/create`,
    getAllPath: `subject/getAll`,
    updatePath: (id) => `subject/update/${id}`,
    getByIdPath: (id) => `subject/getById/${id}`,
    deletePath: (id) => `subject/delete/${id}`,
  },
  syllabus: {
    createPath: `syllabus/create`,
    getAllPath: ({ page, pageSize, search }) =>
      `syllabus/getAll?page=${page}&pagesize=${pageSize}&search=${search}`,
    updatePath: (id) => `syllabus/update/${id}`,
    getByIdPath: (id) => `syllabus/getById/${id}`,
    deletePath: (id) => `syllabus/delete/${id}`,
  },
  subjectQuePaper: {
    createPath: `subjectQuePaper/create`,
    getAllPath: ({ page, pageSize, search }) =>
      `subjectQuePaper/getAll?page=${page}&pagesize=${pageSize}&search=${search}`,
    updatePath: (id) => `subjectQuePaper/update/${id}`,
    getByIdPath: (id) => `subjectQuePaper/getById/${id}`,
    deletePath: (id) => `subjectQuePaper/delete/${id}`,
  },
  chapter: {
    createPath: `chapter/create`,
    getAllPath: `chapter/getAll`,
    updatePath: (id) => `chapter/update/${id}`,
    getByIdPath: (id) => `chapter/getById/${id}`,
    deletePath: (id) => `chapter/delete/${id}`,
  },
  chapterImages: {
    createPath: `chapterImages/create`,
    getAllPath: ({ page, pageSize, search }) =>
      `chapterImages/getAll?page=${page}&pagesize=${pageSize}&search=${search}`,
    updatePath: (id) => `chapterImages/update/${id}`,
    getByIdPath: (id) => `chapterImages/getById/${id}`,
    deletePath: (id) => `chapterImages/delete/${id}`,
  },
  chapterPDF: {
    createPath: `chapterPDF/create`,
    getAllPath: ({ page, pageSize, search }) =>
      `chapterPDF/getAll?page=${page}&pagesize=${pageSize}&search=${search}`,
    updatePath: (id) => `chapterPDF/update/${id}`,
    getByIdPath: (id) => `chapterPDF/getById/${id}`,
    deletePath: (id) => `chapterPDF/delete/${id}`,
  },
  chapterPPT: {
    createPath: `chapterPPT/create`,
    getAllPath: ({ page, pageSize, search }) =>
      `chapterPPT/getAll?page=${page}&pagesize=${pageSize}&search=${search}`,
    updatePath: (id) => `chapterPPT/update/${id}`,
    getByIdPath: (id) => `chapterPPT/getById/${id}`,
    deletePath: (id) => `chapterPPT/delete/${id}`,
  },
  student: {
    createPath: `student/create`,
    getAllPath: `student/getAll`,
    updatePath: (id) => `student/update/${id}`,
    getByIdPath: (id) => `student/getById/${id}`,
    deletePath: (id) => `student/delete/${id}`,
  },
  studentSemesterMapping: {
    createPath: `studentSemesterMapping/create`,
    getAllPath: ({ page, pageSize, search }) =>
      `studentSemesterMapping/getAll?page=${page}&pagesize=${pageSize}&search=${search}`,
    updatePath: (id) => `studentSemesterMapping/update/${id}`,
    getByIdPath: (id) => `studentSemesterMapping/getById/${id}`,
    deletePath: (id) => `studentSemesterMapping/delete/${id}`,
  },
  project: {
    createPath: `project/create`,
    getAllPath: `project/getAll`,
    updatePath: (id) => `project/update/${id}`,
    getByIdPath: (id) => `project/getById/${id}`,
    deletePath: (id) => `project/delete/${id}`,
  },
};
