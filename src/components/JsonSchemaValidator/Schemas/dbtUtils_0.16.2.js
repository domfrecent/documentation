export const Schema = {
  "definitions": {
    passthrough_vars: {
      type: 'array',
      description: '> Click the plus sign to add a new entry',
      minItems: 0,
      items: {
        title: "Type",
        oneOf: [
          {
            type: 'string',
            title: "Column Name"
          },
          {
            type: 'object',
            title: "SQL & Alias",
            properties: {
              sql: { type: 'string' },
              alias: { type: 'string' } // TODO: add regex here to make valid SQL name?
            },
            required: ['sql', 'alias'],
            additionalProperties: false
          }
        ]
      },
      uniqueItems: true,
    }
  },
  type: 'object',
  properties: {
    snowplow__database: {
      type: 'string',
      title: 'Database',
      description: 'Database that contains your atomic events',
      longDescription: 'The database that contains your atomic events table.',
      packageDefault: 'target.database',
      group: 'Warehouse and Tracker',
    },
    snowplow__dev_target_name: {
      type: 'string',
      title: 'Dev Target',
      description:
        'Target name of your development environment as defined in your `profiles.yml` file',
      longDescription: 'The [target name](https://docs.getdbt.com/docs/core/connect-data-platform/profiles.yml) of your development environment as defined in your `profiles.yml` file. See the [Manifest Tables](/docs/modeling-your-data/modeling-your-data-with-dbt/package-mechanics/manifest-tables/) section for more details.',
      packageDefault: 'dev',
      group: 'Warehouse and Tracker',
    },
    snowplow__events_table: {
      type: 'string',
      title: 'Events Table',
      description: 'The name of the table that contains your atomic events',
      longDescription: 'The name of the table that contains your atomic events.',
      packageDefault: 'events',
      group: 'Warehouse and Tracker',
    },
    snowplow__events_schema: {
      type: 'string',
      title: 'Events Schema',
      description: 'The name of the schema that contains your atomic events',
      longDescription: 'The name of the schema that contains your atomic events.',
      packageDefault: 'events',
      group: 'Warehouse and Tracker',
    },
    snowplow__allow_refresh: {
      type: 'boolean',
      title: 'Allow Refresh',
      group: 'Operation and Logic',
      longDescription: 'Used as the default value to return from the `allow_refresh()` macro. This macro determines whether the manifest tables can be refreshed or not, depending on your environment. See the [Manifest Tables](/docs/modeling-your-data/modeling-your-data-with-dbt/package-mechanics/manifest-tables/) section for more details.',
      packageDefault: 'false',
    },
    snowplow__backfill_limit_days: {
      type: 'number',
      minimum: 0,
      title: 'Backfill Limit',
      group: 'Operation and Logic',
      longDescription: 'The maximum numbers of days of new data to be processed since the latest event processed. Please refer to the [incremental logic](docs/modeling-your-data/modeling-your-data-with-dbt/package-mechanics/incremental-processing/#package-state) section for more details.',
      packageDefault: '30',
      description:
        'The maximum numbers of days of new data to be processed since the latest event processed',
    },
    snowplow__custom_sql: {
      type: 'string',
      title: 'Custom SQL',
      group: 'Operation and Logic',
      longDescription: 'This allows you to introduce custom sql to the `snowplow_base_events_this_run` table, which you can then leverage in downstream models. For more information on the usage, see the following page on the [advanced usage of the utils package](/docs/modeling-your-data/modeling-your-data-with-dbt/dbt-custom-models/examples/additional-sql-on-events-this-run/).',
      packageDefault: '',
      description:
        'Custom SQL for your base events this run table.',
    },
    snowplow__days_late_allowed: {
      type: 'number',
      minimum: 0,
      title: 'Days Late Allowed',
      group: 'Operation and Logic',
      longDescription: 'The maximum allowed number of days between the event creation and it being sent to the collector. Exists to reduce lengthy table scans that can occur as a result of late arriving data.',
      packageDefault: '3',
      description:
        'The maximum allowed number of days between the event creation and it being sent to the collector',
    },
    snowplow__max_session_days: {
      type: 'number',
      minimum: 0,
      title: 'Max Session Length',
      longDescription: 'The maximum allowed session length in days. For a session exceeding this length, all events after this limit will stop being processed. Exists to reduce lengthy table scans that can occur due to long sessions which are usually a result of bots.',
      packageDefault: '3',
      group: 'Operation and Logic',
      description:
        'The maximum allowed session length in days. For a session exceeding this length, all events after this limit will stop being processed',
    },
    snowplow__package_name: {
      type: 'number',
      minimum: 0,
      title: 'Package Name',
      group: 'Operation and Logic',
      longDescription: 'The name of the package you are running this macro under. This has implications for your `manifest` table.',
      packageDefault: 'snowplow',
      description:
        'The name of the package you are running this macro under',
    },
    snowplow__session_lookback_days: {
      type: 'number',
      minimum: 0,
      title: 'Session Lookback Window',
      longDescription: 'Number of days to limit scan on `snowplow_web_base_sessions_lifecycle_manifest` manifest. Exists to improve performance of model when we have a lot of sessions. Should be set to as large a number as practical.',
      packageDefault: '730',
      group: 'Operation and Logic',
      description:
        'Number of days to limit scan on `snowplow_web_base_sessions_lifecycle_manifest` manifest',
    },
    snowplow__upsert_lookback_days: {
      type: 'number',
      minimum: 0,
      title: 'Upsert Lookback Days',
      group: 'Operation and Logic',
      longDescription: 'Number of days to look back over the incremental derived tables during the upsert. Where performance is not a concern, should be set to as long a value as possible. Having too short a period can result in duplicates. Please see the [Snowplow Optimized Materialization](docs/modeling-your-data/modeling-your-data-with-dbt/package-mechanics/optimized-upserts/) section for more details.',
      packageDefault: '30',
      description:
        'Number of days to look back over the incremental derived tables during the upsert',
    },
    snowplow__app_id: {
      type: 'array',
      description: '> Click the plus sign to add a new entry',
      minItems: 0,
      title: 'App IDs',
      longDescription: 'A list of `app_id`s to filter the events table on for processing within the package.',
      packageDefault: '[ ] (no filter applied)',
      group: 'Contexts, Filters, and Logs',
      items: { type: 'string' },
    },
    snowplow__session_identifiers: {
      type: 'string',
      title: 'Session Identifiers',
      group: 'Operation and Logic',
      longDescription: 'A list of key:value dictionaries which contain all of the contexts and fields where your session identifiers are located. For each entry in the list, if your map contains the `schema` value `atomic`, then this refers to a field found directly in the atomic `events` table. If you are trying to introduce a context/entity with an identifier in it, the package will look for the context in your events table with the name specified in the `schema` field. It will use the specified value in the `field` key as the field name to access. For Redshift/Postgres, using the `schema` key the package will try to find a table in your `snowplow__events_schema` schema with the same name as the `schema` value provided, and join that. If multiple fields are specified, the package will try to coalesce all fields in the order specified in the list. For a better understanding of the advanced usage of this variable, please see the [Custom Identifiers](docs/modeling-your-data/modeling-your-data-with-dbt/package-features/customer-identifiers/) section for more details.',
      packageDefault: '[{"schema" : "atomic", "field" : "domain_sessionid"}]',
      type: 'array',
      description: '> Click the plus sign to add a new entry',
      minItems: 0,
      items: {
        type: 'object',
        title: "Identifier",
        properties: {
          schema: { type: 'string' }, // TODO: add regex here to make valid context/unstruct or atomic?
          field: { type: 'string' } // TODO: add regex here to make valid SQL name?
        },
        required: ['schema', 'field'],
        additionalProperties: false
      },
      uniqueItems: true,
    },
    snowplow__session_sql: {
      type: 'string',
      title: 'SQL for your session identifier',
      longDescription: 'This allows you to override the `session_identifiers` SQL, to define completely custom SQL in order to build out a session identifier for your events. If you are interested in using this instead of providing identifiers through the `session_identifiers` variable, please see the [Custom Identifiers](docs/modeling-your-data/modeling-your-data-with-dbt/package-features/customer-identifiers/) section for more details on how to do that.',
      packageDefault: '',
      group: 'Operation and Logic',
    },
    snowplow__session_timestamp: {
      type: 'string',
      title: 'Timestamp used for incremental processing, should be your partition field',
      group: 'Operation and Logic',
      longDescription: "Determines which timestamp is used to build the sessionization logic. It's a good idea to have this timestamp be the same timestamp as the field you partition your events table on.",
      packageDefault: 'collector_tstamp',
    },
    snowplow__user_identifiers: {
      type: 'string',
      title: 'User Identifiers',
      group: 'Operation and Logic',
      longDescription: 'A list of key:value dictionaries which contain all of the contexts and fields where your user identifiers are located. For each entry in the list, if your map contains the `schema` value `atomic`, then this refers to a field found directly in the atomic `events` table. If you are trying to introduce a context/entity with an identifier in it, the package will look for the context in your events table with the name specified in the `schema` field. It will use the specified value in the `field` key as the field name to access. For Redshift/Postgres, using the `schema` key the package will try to find a table in your `snowplow__events_schema` schema with the same name as the `schema` value provided, and join that. If multiple fields are specified, the package will try to coalesce all fields in the order specified in the list. For a better understanding of the advanced usage of this variable, please see the [Custom Identifiers](docs/modeling-your-data/modeling-your-data-with-dbt/package-features/customer-identifiers/) section for more details.',
      packageDefault: '[{"schema" : "atomic", "field" : "domain_userid"}]',
      type: 'array',
      description: '> Click the plus sign to add a new entry',
      minItems: 0,
      items: {
        type: 'object',
        title: "Identifier",
        properties: {
          schema: { type: 'string' }, // TODO: add regex here to make valid context/unstruct or atomic?
          field: { type: 'string' } // TODO: add regex here to make valid SQL name?
        },
        required: ['schema', 'field'],
        additionalProperties: false
      },
      uniqueItems: true,
    },
    snowplow__user_sql: {
      type: 'string',
      title: 'SQL for your user identifier',
      longDescription: 'This allows you to override the `user_identifiers` SQL, to define completely custom SQL in order to build out a user identifier for your events. If you are interested in using this instead of providing identifiers through the `user_identifiers` variable, please see the [Custom Identifiers](docs/modeling-your-data/modeling-your-data-with-dbt/package-features/customer-identifiers/) section for more details on how to do that.',
      packageDefault: '',
      group: 'Operation and Logic',
    },
    snowplow__entities_or_sdes: {
      type: 'string',
      title: '(Redshift) Entities or SDEs',
      longDescription: 'A list of dictionaries defining the `context` or `self-describing` event tables to join onto your base events table. Please use the tool below or see the section on [Utilizing custom contexts or SDEs](/docs/modeling-your-data/modeling-your-data-with-dbt/package-features/modeling-entities/) for details of the structure.',
      packageDefault: '[]',
      warehouse: 'Redshift',
        group: 'Warehouse Specific',
        type: 'array',
        description: '> Click the plus sign to add a new entry',
        minItems: 0,
        items: {
          type: 'object',
          title: "Entity or SDE",
            properties: {
              schema: { type: 'string', description: 'Table name' }, // TODO: add regex here to make valid context/unstruct table name
              prefix: { type: 'string', description: 'Prefix to add to columns' }, // TODO: add regex here to make valid SQL name?
              alias: { type: 'string', description: 'Table alias for the subquery' }, // TODO: add regex here to make valid SQL alias?
              single_entity: { type: 'boolean', title: 'Is single entity?'}
            },
            required: ['schema', 'prefix'],
            additionalProperties: false
        },
      uniqueItems: true,
    },
  },
}
