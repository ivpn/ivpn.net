<template>
    <div>
        <ServerList />
        <div class="servers-discovery">
            <p v-html="$t('servers.discoveryLine')"></p>
        </div>
        <div class="servers-faq">
            <dl>
                <dt><h3>{{ $t('servers.faq.streamingQ') }}</h3></dt>
                <dd v-html="$t('servers.faq.streamingA')"></dd>

                <dt><h3>{{ $t('servers.faq.blockedQ') }}</h3></dt>
                <dd v-html="$t('servers.faq.blockedA')"></dd>

                <dt><h3>{{ $t('servers.faq.socksQ') }}</h3></dt>
                <dd v-html="$t('servers.faq.socksA')"></dd>

                <dt><h3>{{ $t('servers.faq.protocolsQ') }}</h3></dt>
                <dd v-html="$t('servers.faq.protocolsA')"></dd>

                <dt><h3>{{ $t('servers.faq.bareMetalQ') }}</h3></dt>
                <dd v-html="$t('servers.faq.bareMetalA')"></dd>
            </dl>
        </div>
    </div>
</template>

<script>
import ServerList from './ServerList.vue'

export default {
    components: { ServerList },
}
</script>
