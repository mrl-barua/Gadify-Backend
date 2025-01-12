export interface Admin {
  id: number;
  username: string;
  password: string;
  email: string;
}

export interface Evaluator {
  id: number;
  name: string;
  departmentId: number;
}

export interface Proponents {
  id: number;
  name: string;
  email: string;
}

export interface Submission {
  id: number;
  title: string;
  description: string;
  evaluatorId: number;
  createdAt: Date;
}

export interface SubmissionProponents {
  submissionId: number;
  proponentsId: number;
}

export interface Remarks {
  id: number;
  submissionId: number;
  evaluatorId: number;
  comment: string;
  createdAt: Date;
}

export interface Campus {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
  campusId: number;
}