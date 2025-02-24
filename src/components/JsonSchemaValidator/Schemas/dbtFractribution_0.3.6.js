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
    snowplow__conversions_source: {
      type: 'string',
      title: 'Conversions Source',
      description: 'Source of conversion events',
      longDescription: 'The source (schema and table) of your conversion events, likely your atomic events table.',
      packageDefault: "{{ source('atomic', 'events') }}",
      group: 'Warehouse and Tracker',
    },
    snowplow__page_views_source: {
      type: 'string',
      title: 'Page Views Source',
      description: 'Source of the derived `snowplow_web_page_views` table',
      longDescription: 'The source (schema and table) of the derived `snowplow_web_page_views` table.',
      packageDefault: "{{ source('derived', 'snowplow_web_page_views') }}",
      group: 'Warehouse and Tracker',
    },
    snowplow__web_user_mapping_table: {
      type: 'string',
      title: 'Web User Mapping Table',
      description: 'Schema and table name of the snowplow web user mapping table',
      longDescription: 'The schema and table name of the snowplow web user mapping table, if different to default.',
      packageDefault: 'derived.snowplow_web_user_mapping',
      group: 'Warehouse and Tracker',
    },
    snowplow__conversions_source_filter: {
      type: 'string',
      title: 'Conversions Source Filter',
      group: 'Operation and Logic',
      longDescription: ' A timestamp field the conversion source field is partitioned on (ideally) for optimized filtering, when left blank `derived_tstamp` is used.',
      packageDefault: 'blank',
    },
    snowplow__conversions_source_filter_buffer_days: {
      type: 'number',
      title: 'Conversions Source Filter Buffer Days',
      group: 'Operation and Logic',
      longDescription: 'The number of days to extend the filter.',
      packageDefault: '1',
    },
    snowplow__conversion_window_start_date: {
      type: 'string',
      title: 'Conversion Window Start Date',
      group: 'Operation and Logic',
      longDescription: 'The start date in UTC for the window of conversions to include.',
      packageDefault: 'current_date()-31',
    },
    snowplow__conversion_window_end_date: {
      type: 'string',
      title: 'Conversion Window End Date',
      group: 'Operation and Logic',
      longDescription: 'The end date in UTC for the window of conversions to include.',
      packageDefault: '',
    },
    snowplow__conversion_window_days: {
      type: 'number',
      minimum: 0,
      title: 'Conversion Window Days',
      group: 'Operation and Logic',
      longDescription: 'The last complete nth number of days (calculated from the last processed pageview within page_views_source) to dynamically update the conversion_window_start_date and end_date with. Will only apply if both variables are left as an empty string.',
      packageDefault: '30',
    },
    snowplow__path_lookback_days: {
      type: 'number',
      minimum: 0,
      title: 'Path Lookback Days',
      group: 'Operation and Logic',
      longDescription: 'Restricts the model to marketing channels within this many days of the conversion (values of 30, 14 or 7 are recommended).',
      packageDefault: '30',
    },
    snowplow__path_lookback_steps: {
      type: 'number',
      minimum: 0,
      title: 'Path Lookback Steps',
      group: 'Operation and Logic',
      longDescription: 'The limit for the number of marketing channels to look at before the conversion.',
      packageDefault: "0 (unlimited)",
    },
    snowplow__path_transforms: {
      type: 'array',
      description: '> Click the plus sign to add a new entry',
      minItems: 0,
      title: 'Path Transforms',
      longDescription: 'Dictionary of path transforms (and their argument, `null` if none) to perform on the full conversion path (see [udfs.sql file](https://github.com/snowplow/dbt-snowplow-fractribution/blob/main/macros/path_transformations/create_udfs.sql)).',
      packageDefault: "{'exposure_path': null}",
      group: 'Contexts, Filters, and Logs',
      items: {
        type: 'object',
        title: "Identifier",
        properties: {
          path_transform: { type: 'string' },
          argument: { type: 'string' }
        },
        required: ['path_transform', 'argument'],
        additionalProperties: false
      },
      uniqueItems: true,
    },
    snowplow__use_snowplow_web_user_mapping_table: {
      type: 'boolean',
      title: 'Use Snowplow Web User Mapping Table',
      group: 'Operation and Logic',
      longDescription: '`true` if you are using the Snowplow web model for web user mappings (`domain_userid` => `user_id`)',
      packageDefault: 'false',
    },
    snowplow__channels_to_exclude: {
      type: 'array',
      description: '> Click the plus sign to add a new entry',
      minItems: 0,
      title: 'Channels to Exclude',
      longDescription: 'List of channels to exclude from analysis (empty to keep all channels). For example, users may want to exclude the `Direct` channel from the analysis.',
      packageDefault: '[ ] (no filter applied)',
      group: 'Contexts, Filters, and Logs',
      items: { type: 'string' },
    },
    snowplow__channels_to_include: {
      type: 'array',
      description: '> Click the plus sign to add a new entry',
      minItems: 0,
      title: 'Channels to Include',
      longDescription: 'List of channels to include in the analysis (empty to keep all channels). For example, users may want to include the `Direct` channel only in the analysis.',
      packageDefault: '[ ] (no filter applied)',
      group: 'Contexts, Filters, and Logs',
      items: { type: 'string' },
    },
    snowplow__conversion_hosts: {
      type: 'array',
      description: '> Click the plus sign to add a new entry',
      minItems: 0,
      title: 'URL Hosts',
      longDescription: '`url_hosts` to filter to in the data processing',
      packageDefault: '[] (no filter applied)',
      group: 'Contexts, Filters, and Logs',
      items: { type: 'string' },
    },
    snowplow__consider_intrasession_channels: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'If `false`, only considers the channel at the start of the session (i.e. first page view). If `true`, considers multiple channels in the conversion session as well as historically.',
      packageDefault: 'false',
      title: 'Consider Intrasession Channels',
    },
    snowplow__run_python_script_in_snowpark: {
      type: 'boolean',
      warehouse: 'Snowflake',
      title: '(Snowflake) Run Python Script in Snowpark',
      longDescription: 'A flag for if you wish to run the python scripts using Snowpark.',
      packageDefault: 'false',
      group: 'Warehouse Specific',
    },
    snowplow__attribution_model_for_snowpark: {
      type: 'string',
      warehouse: 'Snowflake',
      title: '(Snowflake) Attribution Model for Snowpark',
      longDescription: 'The attribution model to use when running in Snowpark; one of `shapley`, `first_touch`, `last_touch`, `position_based`, `linear`. See the [package docs](/docs/modeling-your-data/modeling-your-data-with-dbt/dbt-models/dbt-fractribution-data-model/#attribution-models) for more information.',
      packageDefault: 'shapley',
      group: 'Warehouse Specific',
    },
  },
}
