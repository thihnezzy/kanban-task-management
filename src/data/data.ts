const boards = [
  {
    id: 'board-1',
    name: 'Platform Launch',
    columns: [
      {
        id: 'board-1-column-1',
        name: 'Todo',
        tasks: [
          {
            id: 'board-1-column-1-task-1',
            title: 'Build UI for onboarding flow',
            description: '',
            status: 'board-1-column-1',
            subtasks: [
              {
                id: 'board-1-column-1-task-1-subtask-1',
                title: 'Sign up page',
                isCompleted: true,
              },
              {
                id: 'board-1-column-1-task-1-subtask-2',
                title: 'Sign in page',
                isCompleted: false,
              },
              {
                id: 'board-1-column-1-task-1-subtask-3',
                title: 'Welcome page',
                isCompleted: false,
              },
            ],
          },
          {
            id: 'board-1-column-1-task-2',
            title: 'Build UI for search',
            description: '',
            status: 'board-1-column-1',
            subtasks: [
              {
                id: 'board-1-column-1-task-2-subtask-1',
                title: 'Search page',
                isCompleted: false,
              },
            ],
          },
          {
            id: 'board-1-column-1-task-3',
            title: 'Build settings UI',
            description: '',
            status: 'board-1-column-1',
            subtasks: [
              {
                id: 'board-1-column-1-task-3-subtask-1',
                title: 'Account page',
                isCompleted: false,
              },
              {
                id: 'board-1-column-1-task-3-subtask-2',
                title: 'Billing page',
                isCompleted: false,
              },
            ],
          },
          {
            id: 'board-1-column-1-task-4',
            title: 'QA and test all major user journeys',
            description: 'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.',
            status: 'board-1-column-1',
            subtasks: [
              {
                id: 'board-1-column-1-task-4-subtask-1',
                title: 'Internal testing',
                isCompleted: false,
              },
              {
                id: 'board-1-column-1-task-4-subtask-2',
                title: 'External testing',
                isCompleted: false,
              },
            ],
          },
        ],
      },
      {
        id: 'board-1-column-2',
        name: 'Doing',
        tasks: [
          {
            id: 'board-1-column-2-task-1',
            title: 'Design settings and search pages',
            description: '',
            status: 'board-1-column-2',
            subtasks: [
              {
                id: 'board-1-column-2-task-1-subtask-1',
                title: 'Settings - Account page',
                isCompleted: true,
              },
              {
                id: 'board-1-column-2-task-1-subtask-2',
                title: 'Settings - Billing page',
                isCompleted: true,
              },
              {
                id: 'board-1-column-2-task-1-subtask-3',
                title: 'Search page',
                isCompleted: false,
              },
            ],
          },
          {
            id: 'board-1-column-2-task-2',
            title: 'Add account management endpoints',
            description: '',
            status: 'board-1-column-2',
            subtasks: [
              {
                id: 'board-1-column-2-task-2-subtask-1',
                title: 'Upgrade plan',
                isCompleted: true,
              },
              {
                id: 'board-1-column-2-task-2-subtask-2',
                title: 'Cancel plan',
                isCompleted: true,
              },
              {
                id: 'board-1-column-2-task-2-subtask-3',
                title: 'Update payment method',
                isCompleted: false,
              },
            ],
          },
          {
            id: 'board-1-column-2-task-3',
            title: 'Design onboarding flow',
            description: '',
            status: 'board-1-column-2',
            subtasks: [
              {
                id: 'board-1-column-2-task-3-subtask-1',
                title: 'Sign up page',
                isCompleted: true,
              },
              {
                id: 'board-1-column-2-task-3-subtask-2',
                title: 'Sign in page',
                isCompleted: false,
              },
              {
                id: 'board-1-column-2-task-3-subtask-3',
                title: 'Welcome page',
                isCompleted: false,
              },
            ],
          },
          {
            id: 'board-1-column-2-task-4',
            title: 'Add search enpoints',
            description: '',
            status: 'board-1-column-2',
            subtasks: [
              {
                id: 'board-1-column-2-task-4-subtask-1',
                title: 'Add search endpoint',
                isCompleted: true,
              },
              {
                id: 'board-1-column-2-task-4-subtask-2',
                title: 'Define search filters',
                isCompleted: false,
              },
            ],
          },
          {
            id: 'board-1-column-2-task-5',
            title: 'Add authentication endpoints',
            description: '',
            status: 'board-1-column-2',
            subtasks: [
              {
                id: 'board-1-column-2-task-5-subtask-1',
                title: 'Define user model',
                isCompleted: true,
              },
              {
                id: 'board-1-column-2-task-5-subtask-2',
                title: 'Add auth endpoints',
                isCompleted: false,
              },
            ],
          },
          {
            id: 'board-1-column-2-task-6',
            title: 'Research pricing points of various competitors and trial different business models',
            description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
            status: 'board-1-column-2',
            subtasks: [
              {
                id: 'board-1-column-2-task-6-subtask-1',
                title: 'Research competitor pricing and business models',
                isCompleted: true,
              },
              {
                id: 'board-1-column-2-task-6-subtask-2',
                title: 'Outline a business model that works for our solution',
                isCompleted: false,
              },
              {
                id: 'board-1-column-2-task-6-subtask-3',
                title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                isCompleted: false,
              },
            ],
          },
        ],
      },
      {
        id: 'board-1-column-3',
        name: 'Done',
        tasks: [
          {
            id: 'board-1-column-3-task-1',
            title: 'Conduct 5 wireframe tests',
            description: 'Ensure the layout continues to make sense and we have strong buy-in from potential users.',
            status: 'board-1-column-3',
            subtasks: [
              {
                id: 'board-1-column-3-task-1-subtask-1',
                title: 'Complete 5 wireframe prototype tests',
                isCompleted: true,
              },
            ],
          },
          {
            id: 'board-1-column-3-task-2',
            title: 'Create wireframe prototype',
            description: 'Create a greyscale clickable wireframe prototype to test our asssumptions so far.',
            status: 'board-1-column-3',
            subtasks: [
              {
                id: 'board-1-column-3-task-2-subtask-1',
                title: 'Create clickable wireframe prototype in Balsamiq',
                isCompleted: true,
              },
            ],
          },
          {
            id: 'board-1-column-3-task-3',
            title: 'Review results of usability tests and iterate',
            description: "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
            status: 'board-1-column-3',
            subtasks: [
              {
                id: 'board-1-column-3-task-3-subtask-1',
                title: 'Meet to review notes from previous tests and plan changes',
                isCompleted: true,
              },
              {
                id: 'board-1-column-3-task-3-subtask-2',
                title: 'Make changes to paper prototypes',
                isCompleted: true,
              },
              {
                id: 'board-1-column-3-task-3-subtask-3',
                title: 'Conduct 5 usability tests',
                isCompleted: true,
              },
            ],
          },
          {
            id: 'board-1-column-3-task-4',
            title: 'Create paper prototypes and conduct 10 usability tests with potential customers',
            description: '',
            status: 'board-1-column-3',
            subtasks: [
              {
                id: 'board-1-column-3-task-4-subtask-1',
                title: 'Create paper prototypes for version one',
                isCompleted: true,
              },
              {
                id: 'board-1-column-3-task-4-subtask-2',
                title: 'Complete 10 usability tests',
                isCompleted: true,
              },
            ],
          },
          {
            id: 'board-1-column-3-task-5',
            title: 'Market discovery',
            description: 'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.',
            status: 'board-1-column-3',
            subtasks: [
              {
                id: 'board-1-column-3-task-5-subtask-1',
                title: 'Interview 10 prospective customers',
                isCompleted: true,
              },
            ],
          },
          {
            id: 'board-1-column-3-task-6',
            title: 'Competitor analysis',
            description: '',
            status: 'board-1-column-3',
            subtasks: [
              {
                id: 'board-1-column-3-task-6-subtask-1',
                title: 'Find direct and indirect competitors',
                isCompleted: true,
              },
              {
                id: 'board-1-column-3-task-6-subtask-2',
                title: 'SWOT analysis for each competitor',
                isCompleted: true,
              },
            ],
          },
          {
            id: 'board-1-column-3-task-7',
            title: 'Research the market',
            description: 'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
            status: 'board-1-column-3',
            subtasks: [
              {
                id: 'board-1-column-3-task-7-subtask-1',
                title: 'Write up research analysis',
                isCompleted: true,
              },
              {
                id: 'board-1-column-3-task-7-subtask-2',
                title: 'Calculate TAM',
                isCompleted: true,
              },
            ],
          },
          {
            id: 'board-1-column-3-task-8',
            title: 'Research the market',
            description: 'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
            status: 'board-1-column-3',
            subtasks: [],
          },
          {
            id: 'board-1-column-3-task-9',
            title: 'Research the market',
            description: 'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
            status: 'board-1-column-3',
            subtasks: [],
          },
          {
            id: 'board-1-column-3-task-10',
            title: 'Research the market',
            description: 'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
            status: 'board-1-column-3',
            subtasks: [],
          },
          {
            id: 'board-1-column-3-task-11',
            title: 'Research the market',
            description: 'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
            status: 'board-1-column-3',
            subtasks: [],
          },
          {
            id: 'board-1-column-3-task-12',
            title: 'Research the market',
            description: 'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
            status: 'board-1-column-3',
            subtasks: [],
          },
          {
            id: 'board-1-column-3-task-13',
            title: 'Research the market',
            description: 'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
            status: 'board-1-column-3',
            subtasks: [],
          },
          {
            id: 'board-1-column-3-task-14',
            title: 'Research the market',
            description: 'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
            status: 'board-1-column-3',
            subtasks: [],
          },
        ],
      },
    ],
  },
  {
    id: 'board-2',
    name: 'Marketing Plan',
    columns: [
      {
        id: 'board-2-column-1',
        name: 'Todo',
        tasks: [
          {
            id: 'board-2-column-1-task-1',
            title: 'Plan Product Hunt launch',
            description: '',
            status: 'board-2-column-1',
            subtasks: [
              {
                id: 'board-2-column-1-task-1-subtask-1',
                title: 'Find hunter',
                isCompleted: false,
              },
              {
                id: 'board-2-column-1-task-1-subtask-2',
                title: 'Gather assets',
                isCompleted: false,
              },
              {
                id: 'board-2-column-1-task-1-subtask-3',
                title: 'Draft product page',
                isCompleted: false,
              },
              {
                id: 'board-2-column-1-task-1-subtask-4',
                title: 'Notify customers',
                isCompleted: false,
              },
              {
                id: 'board-2-column-1-task-1-subtask-5',
                title: 'Notify network',
                isCompleted: false,
              },
              {
                id: 'board-2-column-1-task-1-subtask-6',
                title: 'Launch!',
                isCompleted: false,
              },
            ],
          },
          {
            id: 'board-2-column-1-task-2',
            title: 'Share on Show HN',
            description: '',
            status: 'board-2-column-1',
            subtasks: [
              {
                id: 'board-2-column-1-task-2-subtask-1',
                title: 'Draft out HN post',
                isCompleted: false,
              },
              {
                id: 'board-2-column-1-task-2-subtask-2',
                title: 'Get feedback and refine',
                isCompleted: false,
              },
              {
                id: 'board-2-column-1-task-2-subtask-3',
                title: 'Publish post',
                isCompleted: false,
              },
            ],
          },
          {
            id: 'board-2-column-1-task-3',
            title: 'Write launch article to publish on multiple channels',
            description: '',
            status: 'board-2-column-1',
            subtasks: [
              {
                id: 'board-2-column-1-task-3-subtask-1',
                title: 'Write article',
                isCompleted: false,
              },
              {
                id: 'board-2-column-1-task-3-subtask-2',
                title: 'Publish on LinkedIn',
                isCompleted: false,
              },
              {
                id: 'board-2-column-1-task-3-subtask-3',
                title: 'Publish on Inndie Hackers',
                isCompleted: false,
              },
              {
                id: 'board-2-column-1-task-3-subtask-4',
                title: 'Publish on Medium',
                isCompleted: false,
              },
            ],
          },
        ],
      },
      {
        id: 'board-2-column-2',
        name: 'Doing',
        tasks: [],
      },
      {
        id: 'board-2-column-3',
        name: 'Done',
        tasks: [],
      },
    ],
  },
  {
    id: 'board-3',
    name: 'Roadmap',
    columns: [
      {
        id: 'board-3-column-1',
        name: 'Now',
        tasks: [
          {
            id: 'board-3-column-1-task-1',
            title: 'Launch version one',
            description: '',
            status: 'board-3-column-1',
            subtasks: [
              {
                id: 'board-3-column-1-task-1-subtask-1',
                title: 'Launch privately to our waitlist',
                isCompleted: false,
              },
              {
                id: 'board-3-column-1-task-1-subtask-2',
                title: 'Launch publicly on PH, HN, etc.',
                isCompleted: false,
              },
            ],
          },
          {
            id: 'board-3-column-1-task-2',
            title: 'Review early feedback and plan next steps for roadmap',
            description: "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
            status: 'board-3-column-1',
            subtasks: [
              {
                id: 'board-3-column-1-task-2-subtask-1',
                title: 'Interview 10 customers',
                isCompleted: false,
              },
              {
                id: 'board-3-column-1-task-2-subtask-2',
                title: 'Review common customer pain points and suggestions',
                isCompleted: false,
              },
              {
                id: 'board-3-column-1-task-2-subtask-3',
                title: 'Outline next steps for our roadmap',
                isCompleted: false,
              },
            ],
          },
        ],
      },
      {
        id: 'board-3-column-2',
        name: 'Next',
        tasks: [],
      },
      {
        id: 'board-3-column-3',
        name: 'Later',
        tasks: [],
      },
    ],
  },
];

export default boards;
