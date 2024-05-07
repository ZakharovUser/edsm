import { Rows } from 'shared/data-grid/types';

import { _mock } from './_mock';
import { _contacts } from './_others';

export const _inbox_rows: Rows = [
  {
    id: '2024/1',
    name: _mock.postTitle(0),
    rule: 'Правило 1',
    author: _contacts[0],
    importance: 'Обычно',
    department: 'Отдел 1',
    receipt_date: new Date('2024-01-01'),
    creation_date: new Date('2024-01-02'),
    completion_date: new Date('2024-01-03'),
  },
  {
    id: '2024/2',
    name: _mock.postTitle(3),
    rule: 'Правило 2',
    author: _contacts[3],
    importance: 'Важно',
    department: 'Отдел 2',
    receipt_date: new Date('2024-01-04'),
    creation_date: new Date('2024-01-05'),
    completion_date: new Date('2024-01-06'),
  },
  {
    id: '2024/3',
    name: _mock.postTitle(6),
    rule: 'Правило 3',
    author: _contacts[6],
    importance: 'Обычно',
    department: 'Отдел 3',
    receipt_date: new Date('2024-01-07'),
    creation_date: new Date('2024-01-08'),
    completion_date: new Date('2024-01-09'),
  },
  {
    id: '2024/4',
    name: _mock.postTitle(2),
    rule: 'Правило 4',
    author: _contacts[2],
    importance: 'Важно',
    department: 'Отдел 4',
    receipt_date: new Date('2024-01-10'),
    creation_date: new Date('2024-01-11'),
    completion_date: new Date('2024-01-12'),
  },
  {
    id: '2024/5',
    name: _mock.postTitle(9),
    rule: 'Правило 5',
    author: _contacts[9],
    importance: 'Обычно',
    department: 'Отдел 5',
    receipt_date: new Date('2024-01-13'),
    creation_date: new Date('2024-01-14'),
    completion_date: new Date('2024-01-15'),
  },
];
