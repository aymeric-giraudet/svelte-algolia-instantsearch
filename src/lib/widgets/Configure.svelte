<script lang="ts">
  import { connectConfigure } from "instantsearch.js/es/connectors";
  import type { ConfigureConnectorParams } from "instantsearch.js/es/connectors/configure/connectConfigure";

  import connect from "../connect";

  type $$Props = ConfigureConnectorParams["searchParameters"];

  connect(connectConfigure, { searchParameters: $$props });
</script>
