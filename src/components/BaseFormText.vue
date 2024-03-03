<template>
    <BaseFormField :title="title" :error="error">
        <input class="form__input" v-model="dataValue" :type="type" name="name" :placeholder="placeholder">
    </BaseFormField>
</template>

<script>
import FormFielsMixin from '@/mixins/FormFieldMixin.js';

export default {
    props: ['type'],
    mixins: [FormFielsMixin]
}
</script>