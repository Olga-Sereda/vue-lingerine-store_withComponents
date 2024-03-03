<template>
    <BaseFormField :title="title" :error="error">
        <textarea class="form__input form__input--area" v-model="dataValue" name="comments" :placeholder="placeholder"></textarea>
    </BaseFormField>
</template>

<script>
import FormFielsMixin from '@/mixins/FormFieldMixin.js';

export default {
    mixins: [FormFielsMixin]
}
</script>