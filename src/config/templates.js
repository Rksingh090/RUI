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
          name: "WORDPRESS_DB_HOST",
          value: ""
        },
        {
          name: "WORDPRESS_DB_USER",
          value: ""
        },
        {
          name: "WORDPRESS_DB_PASSWORD",
          value: ""
        },
        {
          name: "WORDPRESS_DB_NAME",
          value: ""
        },
        {
          name: "WORDPRESS_TABLE_PREFIX",
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
          name: "MYSQL_DATABASE",
          value: ""
        },
        {
          name: "MYSQL_USER",
          value: ""
        },
        {
          name: "MYSQL_PASSWORD",
          value: ""
        },
        {
          name: "MYSQL_ROOT_PASSWORD",
          value: ""
        },
      ],
    },
    {
      name: "Vault",
      description:
        "Vault is a tool for securely accessing secrets via a unified interface and tight access control.",
      icon: "https://d1q6f0aelx0por.cloudfront.net/product-logos/library-vault-logo.png",
      image: "vault",
      exposed_port: 8200,
      environments: [
        {
          name: "VAULT_DEV_ROOT_TOKEN_ID",
          value: ""
        },
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
          name: "POSTGRES_PASSWORD",
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
          name: "JOOMLA_DB_HOST",
          value: ""
        },
        {
          name: "JOOMLA_DB_USER",
          value: ""
        },
        {
          name: "JOOMLA_DB_PASSWORD",
          value: ""
        },
        {
          name: "JOOMLA_DB_NAME",
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
          name: "MYSQL_ROOT_PASSWORD",
          value: ""
        },
        {
          name: "PMA_HOST",
          value: ""
        }
      ],
    },
    {
      name: "CodeIgniter",
      description: "CodeIgniter is an open-source PHP web application framework, for use in building dynamic web sites with PHP.",
      icon: "https://cdn.worldvectorlogo.com/logos/codeigniter.svg",
      image: "bitnami/codeigniter",
      exposed_port: 80,
      environments: [],
    },
    {
      name: "Hoppscotch",
      description: "Open source API development ecosystem",
      icon: "https://avatars.githubusercontent.com/u/56705483",
      image: "hoppscotch/hoppscotch",
      exposed_port: 3000,
      environments: [],
    },
    {
      name: "Jenkins",
      description: "Jenkins is an open source automation server. It helps to automate the non-human part of the software development process, with continuous integration and facilitating technical aspects of continuous delivery.",
      icon: "https://cdn.worldvectorlogo.com/logos/jenkins.svg",
      image: "jenkins",
      exposed_port: 8080,
      environments: [],
    },
    {
      name: "Kibana",
      description: "Kibana is an open source data visualization plugin for Elasticsearch. It provides visualization capabilities on top of the content indexed on an Elasticsearch cluster.",
      icon: "https://cdn.worldvectorlogo.com/logos/elastic-kibana.svg",
      image: "kibana",
      exposed_port: 5601,
      environments: [],
    },
    {
      name: "Solr",
      description: "Apache Solr is an open source enterprise search platform, written in Java, from the Apache Lucene project.",
      icon: "https://cdn.worldvectorlogo.com/logos/solr.svg",
      image: "solr",
      exposed_port: 8983,
      environments: [],
    },
    {
      name: "Rocket Chat",
      description: "Rocket.Chat is a free and open source web, desktop and mobile chat platform built on the Meteor JavaScript Application Platform.",
      icon: "https://cdn.worldvectorlogo.com/logos/rocket-chat.svg",
      image: "rocket.chat",
      exposed_port: 3000,
      environments: [],
    },
    {
      name: "Python",
      description: "Python is an interpreted, interactive, object-oriented, open-source programming language.",
      icon: "https://cdn.worldvectorlogo.com/logos/python-5.svg",
      image: "3.12.0b4-alpine3.18",
      exposed_port: 3000,
      environments: [],
    },
    {
      name: "Post Fix Admin",
      description: "Postfix Admin is a web based interface used to manage mailboxes, virtual domains and aliases for Postfix, Dovecot and MySQL.",
      icon: "https://styles.redditmedia.com/t5_2ub10/styles/communityIcon_uisxd1pkk2n71.png",
      image: "postfixadmin",
      exposed_port: 80,
      environments: [],
    },
    {
      name: "Portainer",
      description: "Portainer is a lightweight management UI which allows you to easily manage your Docker host or Swarm cluster.",
      icon: "https://cdn.worldvectorlogo.com/logos/portainer.svg",
      image: "portainer/portainer",
      exposed_port: 9000,
      environments: [],
    },
    {
      name: "Moodle",
      description: "Moodle is a free and open-source learning management system (LMS) written in PHP and distributed under the GNU General Public License.",
      icon: "https://cdn.icon-icons.com/icons2/2415/PNG/512/moodle_original_logo_icon_146420.png",
      image: "bitnami/moodle",
      exposed_port: 80,
      environments: [
        {
          name: "ALLOW_EMPTY_PASSWORD",
          value: "yes"
        },
        {
          name: "MOODLE_DATABASE_USER",
          value: ""
        },
        {
          name: "MOODLE_DATABASE_PASSWORD",
          value: ""
        },
        {
          name: "MOODLE_DATABASE_NAME",
          value: ""
        }
      ],
    },
    {
      name: "Open Search",
      description: "OpenSearch is a community-driven, open source fork of Elasticsearch.",
      icon: "https://opensearch.org/assets/opensearch-twitter-card.png",
      image: "opensearchproject/opensearch",
      exposed_port: 9200,
      environments: [
        {
          name: "discovery.type",
          value: "single-node"
        }
      ],
    },
    {
      name: "Hasura",
      description: "Hasura GraphQL Engine is a blazing-fast GraphQL server that gives you instant, realtime GraphQL APIs over Postgres, with webhook triggers on database events for asynchronous business logic.",
      icon: "https://hasura.io/brand-assets/hasura-icon-primary.png",
      image: "hasura/graphql-engine",
      exposed_port: 8080,
      environments: [
        {
          name: "HASURA_GRAPHQL_DATABASE_URL",
          value: ""
        },
        {
          name: "HASURA_GRAPHQL_ENABLE_CONSOLE",
          value: "true"
        },
        {
          name: "HASURA_GRAPHQL_ADMIN_SECRET",
          value: ""
        }
      ],
    }
  ];