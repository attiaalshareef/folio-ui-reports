/* eslint-disable react/sort-prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, isEqual, sortBy } from 'lodash';

const WithTranslations = (WrappedComponent) => class WithTranslationsComponent extends Component {
    static manifest = Object.freeze({
      ...WrappedComponent.manifest,
      translations: {
        type: 'okapi',
        path: 'translations?limit=1000',
        records: 'translations',
        accumulate: true,
        fetch: false,
        resourceShouldRefresh: true,
        POST: {
          path: 'translations',
        },
        PUT: {
          path: 'translations/%{translationId}',
        },
      },
      translationId: '',
      languageTranslators: {
        type: 'okapi',
        path: 'languageTranslators?limit=1000',
        records: 'languageTranslators',
        accumulate: true,
        fetch: false,
        resourceShouldRefresh: true,
      },
    });

    static propTypes = {
      stripes: PropTypes.shape({
        connect: PropTypes.func.isRequired,
        okapi: PropTypes.object,
        locale: PropTypes.string,
      }).isRequired,
      resources: PropTypes.shape({
        languageTranslators: PropTypes.shape({
          records: PropTypes.arrayOf(PropTypes.object),
        }),
        translations: PropTypes.shape({
          records: PropTypes.arrayOf(PropTypes.object),
        }),
        translationId: PropTypes.shape({
          replace: PropTypes.func.isRequired,
        }),
      }),
      mutator: PropTypes.shape({
        languageTranslators: PropTypes.shape({
          GET: PropTypes.func.isRequired,
          reset: PropTypes.func.isRequired,
        }),
        translations: PropTypes.shape({
          GET: PropTypes.func.isRequired,
          reset: PropTypes.func.isRequired,
          POST: PropTypes.func.isRequired,
          PUT: PropTypes.func.isRequired,
        }),
        translationId: PropTypes.shape({
          replace: PropTypes.func.isRequired,
        }),
      }),
    };

    state = {
      languageTranslators: [],
      translations: [],
    };

    static getDerivedStateFromProps(nextProps, state) {
      const languageTranslators = sortBy(
        (nextProps.resources.languageTranslators || {}).records || [],
        ['localeValue']
      );
      const translations = sortBy(
        (nextProps.resources.translations || {}).records || [],
        ['localeValue']
      );

      if (!isEqual(translations, state.translations)) {
        return {
          translations,
        };
      }

      if (!isEqual(languageTranslators, state.languageTranslators)) {
        return {
          languageTranslators,
        };
      }
      return null;
    }

    componentDidMount() {
      this.props.mutator.translations.reset();
      this.props.mutator.languageTranslators.reset();
      this.props.mutator.languageTranslators.GET();
      this.props.mutator.translations.GET();
    }

    // componentWillUnmount() {
    //   this.props.mutator.translations.reset();
    //   this.props.mutator.languageTranslators.reset();
    // }

    getLocaleTranslators = () => {
      return this.state.languageTranslators;
    };

    getAssignedLocales = () => {
      const assignedLocales = [];
      this.getLocaleTranslators().forEach((loc) => {
        assignedLocales.push(loc.localeValue);
      });
      return assignedLocales;
    };

    ifAssignedLocale = (localeValue) => {
      return this.getLocaleTranslators().some(
        (loc) => loc.localeValue === localeValue
      );
    };

    getLocaleTranslatorsByValue = (localeValue) => {
      const locTranslators = this.getLocaleTranslators().filter(
        (loc) => loc.localeValue === localeValue
      );
      const translators = [];
      locTranslators.forEach((trans) => {
        trans.translators.forEach((element) => {
          translators.push(element.value);
        });
      });
      return translators;
    };

    getSavedLocales = () => {
      const Translations = sortBy(
        (this.props.resources.translations || {}).records || [],
        ['localeValue']
      );
      return Translations.map((loc) => loc.localeValue);
    };

    // getTranslationsMetadata = (localeValue) => {
    //   const metadata = this.state.translations
    //     .filter((curTrans) => curTrans.localeValue === localeValue)
    //     .map((meta) => meta.metadata);
    //   return metadata.length ? metadata[0] : metadata;
    // };

    getTranslationsByLocaleValue = (localeValue) => {
      const localeTranslations = this.state.translations
        .filter((curTrans) => curTrans.localeValue === localeValue)
        .map((id) => id.messages);
      return localeTranslations.length ? localeTranslations : [];
    };

    updateTranslationsByLocaleValue = (localeValue, newTranslations) => {
      const record = this.state.translations.filter(
        (curTrans) => curTrans.localeValue === localeValue
      );
      if (record.length) {
        this.props.mutator.translationId.replace(record[0].id);
        record[0].masseges = newTranslations;
        this.props.mutator.translations.PUT(record[0]);
      } else {
        this.props.mutator.translations.POST({
          localeValue,
          masseges: newTranslations,
        });
      }
    };


    getTranslations = (localeValue, categoryName) => {
      const translations = sortBy(
        (this.props.resources.translations || {}).records || [],
        ['localeValue']
      ).find(
        (curTrans) => curTrans.localeValue === localeValue &&
          curTrans.categoryName === categoryName
      );
      return get(translations, ['messages'], {});
    };

    getTranslationsMetadata = (localeValue, categoryName) => {
      const metadata = sortBy(
        (this.props.resources.translations || {}).records || [],
        ['localeValue']
      ).find(
        (curTrans) => curTrans.localeValue === localeValue &&
          curTrans.categoryName === categoryName
      );
      return get(metadata, ['metadata'], {});
    };

    getCategoryLocales = (categoryName) => {
      return sortBy(
        (this.props.resources.translations || {}).records || [],
        ['localeValue']
      ).filter(
        (curTrans) => curTrans.categoryName === categoryName
      );
    };

    updateTranslations = (localeValue, categoryName, newTranslations) => {
      const translations = sortBy(
        (this.props.resources.translations || {}).records || [],
        ['localeValue']
      );
      const record = translations.filter(
        (curTrans) => curTrans.localeValue === localeValue &&
          curTrans.categoryName === categoryName
      );
      if (record && record.length !== 0) {
        this.props.mutator.translationId.replace(record[0].id);
        record[0].messages = Object.assign(record[0].messages, newTranslations);
        this.props.mutator.translations.PUT(record[0]);
      } else {
        this.props.mutator.translations.POST({
          categoryName,
          localeValue,
          messages: newTranslations,
        });
      }
    };

    render() {
      return (
        <WrappedComponent
          getLocaleTranslators={this.getLocaleTranslators}
          getAssignedLocales={this.getAssignedLocales}
          getLocaleTranslatorsByValue={this.getLocaleTranslatorsByValue}
          ifAssignedLocale={this.ifAssignedLocale}
          getSavedLocales={this.getSavedLocales}
          getTranslationsByLocaleValue={this.getTranslationsByLocaleValue}
          updateTranslationsByLocaleValue={this.updateTranslationsByLocaleValue}
          getTranslationsMetadata={this.getTranslationsMetadata}
          getTranslations={this.getTranslations}
          getCategoryLocales={this.getCategoryLocales}
          updateTranslations={this.updateTranslations}
          {...this.props}
        />
      );
    }
};

export default WithTranslations;
