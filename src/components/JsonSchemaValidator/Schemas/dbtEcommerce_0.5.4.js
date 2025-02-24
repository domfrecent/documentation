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
    snowplow__categories_separator: {
      type: 'string',
      title: 'Categories Separator',
      description: 'Separator used to split out your subcategories from your main subcategory',
      longDescription: 'The separator used to split out your subcategories from your main subcategory. If for example your category field is filled as follows: `books/fiction/magical-fiction` then you should specify `"/"` as the separator in order for the subcolumns to be properly parsed.',
      packageDefault: '/',
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
    snowplow__number_category_levels: {
      type: 'number',
      minimum: 0,
      title: 'Number of Category Levels',
      description:
        'Maximum number of levels of subcategories that exist on your website for products',
      longDescription: 'The **maximum** number of levels (depth) of subcategories that exist on your website for products. These subcategories are recorded in the category field of the product context, and should be separated using the separator which is defined below. For example, `books/fiction/magical-fiction` has a level of 3. The value is the number of columns that will be generated in the product tables created by this Snowplow dbt package. Please note that some products can have less than the maximum number of categories specified.',
      packageDefault: '4',
      group: 'Warehouse and Tracker',
    },
    snowplow__number_checkout_steps: {
      type: 'number',
      minimum: 0,
      title: 'Number of Checkout Steps',
      description:
        'Index of the checkout step which represents a completed transaction',
      longDescription: 'The index of the checkout step which represents a completed transaction. This is required to enable working checkout funnel analysis, and has a default value of 4.',
      packageDefault: '4',
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
    snowplow__ecommerce_event_names: {
      type: 'array',
      title: 'E-commerce Event Names',
      group: 'Operation and Logic',
      longDescription: 'The list of event names that the Snowplow e-commerce package will filter on when extracting events from your atomic events table. If you have included any custom e-commerce events, feel free to add their event name in this list to include them in your data models.',
      packageDefault: "['snowplow_ecommerce_action']",
      type: 'array',
      description: '> Click the plus sign to add a new entry',
      minItems: 0,
      items: { type: 'string' },
    },
    snowplow__enable_mobile_events: {
      type: 'boolean',
      title: 'Enable mobile events',
      longDescription: 'A boolean whether to use the mobile contexts for mobile e-commerce events in the processing (based on the client session and screen view context).',
      packageDefault: 'false',
      group: 'Operation and Logic',
    },
    snowplow__lookback_window_hours: {
      type: 'number',
      minimum: 0,
      title: 'Event Lookback Window',
      longDescription: 'The number of hours to look before the latest event processed - to account for late arriving data, which comes out of order.',
      packageDefault: '6',
      group: 'Operation and Logic',
      description:
        'The number of hours to look before the latest event processed - to account for late arriving data, which comes out of order',
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
    snowplow__session_lookback_days: {
      type: 'number',
      minimum: 0,
      title: 'Session Lookback Window',
      longDescription: 'Number of days to limit scan on `snowplow_ecommerce_base_sessions_lifecycle_manifest` manifest. Exists to improve performance of model when we have a lot of sessions. Should be set to as large a number as practical.',
      packageDefault: '730',
      group: 'Operation and Logic',
      description:
        'Number of days to limit scan on `snowplow_ecommerce_base_sessions_lifecycle_manifest` manifest',
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
    snowplow__disable_ecommerce_carts: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Flag to exclude the `Snowplow E-commerce` [cart entity](/docs/collecting-data/collecting-from-own-applications/javascript-trackers/web-tracker/plugins/snowplow-ecommerce/#cart-entity) context in case this is disabled or not used in your tracking.',
      packageDefault: 'false',
      title: 'Disable Carts Module',
    },
    snowplow__disable_ecommerce_checkouts: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Flag to exclude the `Snowplow E-commerce` [checkout entity](/docs/collecting-data/collecting-from-own-applications/javascript-trackers/web-tracker/plugins/snowplow-ecommerce/#checkout-step-entity) context in case this is disabled or not used in your tracking.',
      packageDefault: 'false',
      title: 'Disable Checkouts Module',
    },
    snowplow__disable_ecommerce_page_context: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Flag to exclude the `Snowplow E-commerce` [page entity](/docs/collecting-data/collecting-from-own-applications/javascript-trackers/web-tracker/plugins/snowplow-ecommerce/#ecommerce-page-entity) context in case this is disabled or not used in your tracking.',
      packageDefault: 'false',
      title: 'Disable Page Context Module',
    },
    snowplow__disable_ecommerce_products: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Flag to exclude the `Snowplow E-commerce` [product entity](/docs/collecting-data/collecting-from-own-applications/javascript-trackers/web-tracker/plugins/snowplow-ecommerce/#product-entity) context in case this is disabled or not used in your tracking.',
      packageDefault: 'false',
      title: 'Disable Products Module',
    },
    snowplow__disable_ecommerce_transactions: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Flag to exclude the `Snowplow E-commerce` [transaction entity](/docs/collecting-data/collecting-from-own-applications/javascript-trackers/web-tracker/plugins/snowplow-ecommerce/#transaction-entity) context in case this is disabled or not used in your tracking.',
      packageDefault: 'false',
      title: 'Disable Transactions Module',
    },
    snowplow__disable_ecommerce_user_context: {
      type: 'boolean',
      group: 'Contexts, Filters, and Logs',
      longDescription: 'Flag to exclude the `Snowplow E-commerce` [user entity](/docs/collecting-data/collecting-from-own-applications/javascript-trackers/web-tracker/plugins/snowplow-ecommerce/#ecommerce-user-entity) context in case this is disabled or not used in your tracking.',
      packageDefault: 'false',
      title: 'Disable User Context Module',
    },
    snowplow__databricks_catalog: {
      type: 'string',
      title: '(Databricks) Catalog',
      warehouse: 'Databricks',
      group: 'Warehouse Specific',
      longDescription: "The catalogue your atomic events table is in. Depending on the use case it should either be the catalog (for Unity Catalog users from databricks connector 1.1.1 onwards, defaulted to `hive_metastore`) or the same value as your `snowplow__atomic_schema` (unless changed it should be 'atomic').",
      packageDefault: 'hive_metastore',
      description: 'The catalogue your atomic events table is in',
    },
    snowplow__derived_tstamp_partitioned: {
      type: 'boolean',
      warehouse: 'Bigquery',
      title: '(Bigquery) Dervied Timestamp Partition',
      longDescription: 'Boolean to enable filtering the events table on `derived_tstamp` in addition to `collector_tstamp`.',
      packageDefault: 'true',
      group: 'Warehouse Specific',
    },
    snowplow__use_product_quantity: {
      type: 'boolean',
      group: 'Operation and Logic',
      longDescription: 'Flag to use the product quantity value for the number of products in a transaction, instead of the count of events.',
      packageDefault: 'false',
      title: 'Use Product Quantity',
    },
    snowplow__enable_load_tstamp: {
      type: 'boolean',
      warehouse: 'Redshift',
      title: '(Redshift) Enable load_tstamp',
      longDescription: 'Flag to include the `load_tstamp` column in the base events this run model. This should be set to true (the default) unless you are using the Postgres loader or an RDB loader version less than 4.0.0. It must be true to use consent models on Postgres and Redshift.',
      packageDefault: 'true',
      group: 'Warehouse Specific',
    },
  },
}
