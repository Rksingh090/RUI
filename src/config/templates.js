export const availableTemplates = [
    {
      name: "WordPress",
      description:
        " WordPress is a free and open-source content management system written in PHP and paired with a MySQL or MariaDB database.",
      icon: "https://cdn.worldvectorlogo.com/logos/wordpress-blue.svg",
      image: "wordpress",
      exposed_port: 80,
      environments: [
        {
          key: "WORDPRESS_DB_HOST",
          value: ""
        },
        {
          key: "WORDPRESS_DB_USER",
          value: ""
        },
        {
          key: "WORDPRESS_DB_PASSWORD",
          value: ""
        },
        {
          key: "WORDPRESS_DB_NAME",
          value: ""
        },
        {
          key: "WORDPRESS_TABLE_PREFIX",
          value: "wp_"
        }
      ],
    },

    {
      name: "Drupal",
      description: "Drupal is a free and open-source content-management framework written in PHP and distributed under the GNU General Public License.",
      icon: "https://cdn.worldvectorlogo.com/logos/drupal.svg",
      image: "drupal",
      exposed_port: 80,
      environments: [
        {
          key: "MYSQL_DATABASE",
          value: ""
        },
        {
          key: "MYSQL_USER",
          value: ""
        },
        {
          key: "MYSQL_PASSWORD",
          value: ""
        },
        {
          key: "MYSQL_ROOT_PASSWORD",
          value: ""
        },
      ],
    },
    {
      name: "MongoDB",
      description:
        "MongoDB is a free and open-source cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemata. ",
      icon: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
      image: "mongo",
      exposed_port: 27017,
      environments: [
        {
          key: "MONGO_INITDB_ROOT_USERNAME",
          value: ""
        },
        {
          key: "MONGO_INITDB_ROOT_PASSWORD",
          value: ""
        },
      ],
    },
    {
      name: "MongoExpress",
      description:
        "MongoDB is a free and open-source cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemata. ",
      icon: "https://cdn.worldvectorlogo.com/logos/mango-4.svg",
      image: "mongo-express",
      exposed_port: 8081,
      environments: [
        {
          key: "ME_CONFIG_MONGODB_ADMINUSERNAME",
          value: ""
        },
        {
          key: "ME_CONFIG_MONGODB_ADMINPASSWORD",
          value: ""
        },
        {
          key: "ME_CONFIG_MONGODB_URL",
          value: "mongodb://root:example@mongo:27017/"
        },
        {
          key: "ME_CONFIG_MONGODB_SERVER",
          value: ""
        }
      ],
    },
    {
      name: "PostgreSQL",
      description: "PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.",
      icon: "https://cdn.worldvectorlogo.com/logos/postgresql.svg",
      image: "supabase/postgres",
      exposed_port: 5432,
      environments: [
        {
          key: "POSTGRES_PASSWORD",
          value: ""
        }
      ],
    },

    {
      name: "Joomla",
      description:
        "Joomla is a free and open-source content management system (CMS) for publishing web content. It is built on a model–view–controller web application framework that can be used independently of the CMS.",
      icon: "https://cdn.worldvectorlogo.com/logos/joomla.svg",
      image: "joomla",
      exposed_port: 80,
      environments: [
        {
          key: "JOOMLA_DB_HOST",
          value: ""
        },
        {
          key: "JOOMLA_DB_USER",
          value: ""
        },
        {
          key: "JOOMLA_DB_PASSWORD",
          value: ""
        },
        {
          key: "JOOMLA_DB_NAME",
          value: ""
        }
      ],
    },
    {
      name: "PhpMyAdmin",
      description: "PhpMyAdmin is a free software tool written in PHP, intended to handle the administration of MySQL over the Web.",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/PhpMyAdmin_logo.svg/1280px-PhpMyAdmin_logo.svg.png",
      image: "phpmyadmin/phpmyadmin",
      exposed_port: 80,
      environments: [
        {
          key: "MYSQL_ROOT_PASSWORD",
          value: ""
        },
        {
          key: "PMA_HOST",
          value: ""
        }
      ],
    },
    {
      name: "mysql",
      description: "MySQL is a widely used, open-source relational database management system (RDBMS).",
      icon: "https://cdn.worldvectorlogo.com/logos/mysql-logo.svg",
      image: "mysql:latest",
      exposed_port: 3307,
      environments: [
        {
          key: "MYSQL_ROOT_PASSWORD",
          value: ""
        }
      ],

    },
   
  ];