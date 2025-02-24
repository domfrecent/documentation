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
    snowplow__atomic_schema: {
      type: 'string',
      title: 'Schema',
      description: 'Schema (dataset) that contains your atomic events',
      longDescription: 'The schema (dataset for BigQuery) that contains your atomic events table.',
      packageDefault: 'atomic',
      group: 'Warehouse and Tracker',
    },
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
    snowplow__start_date: {
      type: 'string',
      format: 'date',
      title: 'Start Date',
      group: 'Operation and Logic',
      longDescription: 'The date to start processing events from in the package on first run or a full refresh, based on `collector_tstamp`',
      packageDefault: '2020-01-01',
      description:
        'The date to start processing events from in the package on first run or a full refresh, based on `collector_tstamp`',
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
    snowplow__session_lookback_days: {
      type: 'number',
      minimum: 0,
      title: 'Session Lookback Window',
      longDescription: 'Number of days to limit scan on `snowplow_media_player_base_sessions_lifecycle_manifest` manifest. Exists to improve performance of model when we have a lot of sessions. Should be set to as large a number as practical.',
      packageDefault: '730',
      group: 'Operation and Logic',
      description:
        'Number of days to limit scan on `snowplow_media_player_base_sessions_lifecycle_manifest` manifest',
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
    snowplow__allow_refresh: {
      type: 'boolean',
      title: 'Allow Refresh',
      group: 'Operation and Logic',
      longDescription: 'Used as the default value to return from the `allow_refresh()` macro. This macro determines whether the manifest tables can be refreshed or not, depending on your environment. See the [Manifest Tables](/docs/modeling-your-data/modeling-your-data-with-dbt/package-mechanics/manifest-tables/) section for more details.',
      packageDefault: 'false',
    },
    snowplow__session_timestamp: {
      type: 'string',
      title: 'Start Date',
      group: 'Operation and Logic',
      longDescription: "This determines which timestamp is used to process sessions of data. It's a good idea to have this timestamp be the same timestamp as the field you partition your events table on.",
      packageDefault: 'collector_tstamp',
      description:
        'Determines which timestamp is used to process sessions of data',
    },
    snowplow__media_event_names: {
      type: 'array',
      description: '> Click the plus sign to add a new entry',
      minItems: 0,
      title: 'Event names to process',
      longDescription: 'A list of names for media events to include for processing.',
      packageDefault: "['media_player_event']",
      group: 'Contexts, Filters, and Logs',
      items: { type: 'string' },
    },
    snowplow__percent_progress_boundaries: {
      type: 'array',
      title: 'Percent Progress Boundaries',
      group: 'Warehouse and Tracker',
      longDescription: 'The list of percent progress values. It needs to be aligned with the values being tracked by the tracker. It is worth noting that the more these percent progress boundaries are being tracked the more accurate the play time calculations become. Please note that tracking 100% is unnecessary as there is a separate `ended` event which the model equates to achieving 100% and it also gets included automatically to this list, in case it is not added (you can refer to the helper macro `get_percentage_boundaries` ([source](https://snowplow.github.io/dbt-snowplow-media-player/#!/macro/macro.snowplow_media_player.get_percentage_boundaries)) for details).',
      packageDefault: "[10, 25, 50, 75]",
      description: '> Click the plus sign to add a new entry',
      minItems: 0,
      items: { type: 'number' },
    },
    snowplow__complete_play_rate: {
      type: 'number',
      minimum: 0,
      maximum: 1,
      title: 'Complete Play Rate',
      group: 'Operation and Logic',
      longDescription: 'The rate to set what percentage of a media needs to be played in order to consider that complete. 0.99 (=99%) is set as a default value here but it may be increased to 1 (or decreased) depending on the use case.',
      packageDefault: '0.99',
      description:
        'Percentage of a media needs to be played in order to consider that complete',
    },
    snowplow__max_media_pv_window: {
      type: 'number',
      minimum: 0,
      title: 'Max Media Page View Window',
      group: 'Operation and Logic',
      longDescription: 'The number of hours that needs to pass before new page_view level media player metrics from the `snowplow_media_player_base` table are safe to be processed by the model downstream in the `snowplow_media_player_media_stats` table. Please note that even if new events are added later on ( e.g. new `percentprogress` events are fired indicating potential replay) and the `snowplow_media_player_base` table is changed, the model will not update them in the media_stats table, therefore it is safer to set as big of a number as still convenient for analysis and reporting.',
      packageDefault: '10',
      description:
        'Number of hours that needs to pass before new page_view level media player metrics from the `snowplow_media_player_base` table are safe to be processed',
    },
    snowplow__valid_play_sec: {
      type: 'number',
      minimum: 0,
      title: 'Valid Play Seconds',
      group: 'Operation and Logic',
      longDescription: 'The minimum number of seconds that a media play needs to last to consider that interaction a valid play. The default is 30 seconds (based on the YouTube standard) but it can be modified here, if needed.',
      packageDefault: '30',
      description:
        'Minimum number of seconds that a media play needs to last to consider that interaction a valid play',
    },
    surrogate_key_treat_nulls_as_empty_strings: {
      type: 'boolean',
      title: 'Surrogate Key Treat Nulls as Empty Strings',
      group: 'Operation and Logic',
      longDescription: 'Passed through to `dbt_utils` to match legacy surrogate key behavior.',
      packageDefault: 'true',
      description:
        'Passed through to `dbt_utils` to match legacy surrogate key behavior.',
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
    snowplow__enable_whatwg_media: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Set to `true` if the [HTML5 media element context schema](https://github.com/snowplow/iglu-central/blob/master/schemas/org.whatwg/media_element/jsonschema/1-0-0) is enabled. This variable is used to handle syntax depending on whether the context fields are available in the database or not.',
      packageDefault: 'false',
      title: 'Enable WhatWG Media Module',
    },
    snowplow__enable_whatwg_video: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Set to `true` if the [HTML5 video element context schema](https://github.com/snowplow/iglu-central/blob/master/schemas/org.whatwg/video_element/jsonschema/1-0-0) is enabled. This variable is used to handle syntax depending on whether the context fields are available in the database or not.',
      packageDefault: 'false',
      title: 'Enable WhatWG Video Module',
    },
    snowplow__enable_youtube: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Set to `true` if the [YouTube context schema](https://github.com/snowplow/iglu-central/blob/master/schemas/com.youtube/youtube/jsonschema/1-0-0) is enabled. This variable is used to handle syntax depending on whether the context fields are available in the database or not.',
      packageDefault: 'false',
      title: 'Enable YouTube Module',
    },
    snowplow__enable_media_player_v1: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Set to `true` if the [version 1 of the media player context schema](https://github.com/snowplow/iglu-central/blob/master/schemas/com.snowplowanalytics.snowplow/media_player/jsonschema/1-0-0) is enabled. This schema was used in our older media plugins on the JavaScript tracker. It is not tracked in the latest versions.',
      packageDefault: 'false',
      title: 'Enable Media Player v1 Module',
    },
    snowplow__enable_media_player_v2: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Set to `true` if the [version 2 of the media player context schema](https://github.com/snowplow/iglu-central/blob/master/schemas/com.snowplowanalytics.snowplow/media_player/jsonschema/2-0-0) is enabled. This is tracked by our latest JavaScript and mobile trackers.',
      packageDefault: 'false',
      title: 'Enable Media Player v2 Module',
    },
    snowplow__enable_media_session: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Set to `true` if the [media session context schema](https://github.com/snowplow/iglu-central/blob/master/schemas/com.snowplowanalytics.snowplow.media/session/jsonschema/1-0-0) is enabled. This is tracked by our latest JavaScript and mobile trackers (optional but enabled by default).',
      packageDefault: 'false',
      title: 'Enable Media Session Module',
    },
    snowplow__enable_media_ad: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Set to `true` if the [media ad context schema](https://github.com/snowplow/iglu-central/blob/master/schemas/com.snowplowanalytics.snowplow.media/ad/jsonschema/1-0-0) is enabled. This is tracked by our latest JavaScript and mobile trackers along with ad events.',
      packageDefault: 'false',
      title: 'Enable Media Ad Module',
    },
    snowplow__enable_media_ad_break: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Set to `true` if the [media ad-break context schema](https://github.com/snowplow/iglu-central/blob/master/schemas/com.snowplowanalytics.snowplow.media/ad_break/jsonschema/1-0-0) is enabled. This is tracked by our latest JavaScript and mobile trackers when ad breaks are tracked along with ad events.',
      packageDefault: 'false',
      title: 'Enable Media Ad Break Module',
    },
    snowplow__enable_web_events: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Whether to use the web contexts for web media events in the processing (based on the web page context).',
      packageDefault: 'false',
      title: 'Enable Web Events Module',
    },
    snowplow__enable_mobile_events: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Whether to use the mobile contexts for mobile media events in the processing (based on the client session and screen view context).',
      packageDefault: 'false',
      title: 'Enable Mobile Events Module',
    },
    snowplow__enable_ad_quartile_event: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Set to `true` if [ad quartile events](https://github.com/snowplow/iglu-central/blob/master/schemas/com.snowplowanalytics.snowplow.media/ad_quartile_event/jsonschema/1-0-0) are tracked during media ad playback.',
      packageDefault: 'false',
      title: 'Enable Ad Quartile Module',
    },
    snowplow__enable_load_tstamp: {
      type: 'boolean',
      warehouse: 'Redshift',
      title: '(Redshift) Enable load_tstamp',
      longDescription: 'Flag to include the `load_tstamp` column in the base events this run model. This should be set to true (the default) unless you are using the Postgres loader or an RDB loader version less than 4.0.0. It must be true to use consent models on Postgres and Redshift.',
      packageDefault: 'true',
      group: 'Warehouse Specific',
    },
    snowplow__derived_tstamp_partitioned: {
      type: 'boolean',
      warehouse: 'Bigquery',
      title: '(Bigquery) Dervied Timestamp Partition',
      longDescription: 'Boolean to enable filtering the events table on `derived_tstamp` in addition to `collector_tstamp`.',
      packageDefault: 'true',
      group: 'Warehouse Specific',
    },
  },
}
