import React, {FunctionComponent, useState, useEffect} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {Input, ListItem} from 'react-native-elements';
import {useDebounce} from '../../hooks';
import {ScrollView} from 'react-native-gesture-handler';

type SearchResultsType = {
  label: string;
  value: {username: string; _id: string};
};
interface Props {
  initialValue: string;
  doSearch: (arg: string) => void;
  searchDelay: number;
  searchResults: Array<SearchResultsType>;
  placeholder: string;
  label: string;
  loading: boolean;
  handleSelect: (params: SearchResultsType) => void;
}

const TypeAhead: FunctionComponent<Props> = ({
  initialValue,
  doSearch,
  searchDelay,
  searchResults,
  placeholder,
  label,
  loading,
  handleSelect,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const debouncedInputValue = useDebounce(inputValue, searchDelay);

  useEffect(() => {
    if (!initialValue) {
      return;
    }
    setInputValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!showResults || debouncedInputValue.length < 3) {
      return;
    }
    doSearch(debouncedInputValue);
  }, [showResults, debouncedInputValue, doSearch]);

  const handleInputChange = (text: string) => {
    setShowResults(text.length >= 3);
    setInputValue(text);
    handleSelect({value: {username: '', _id: ''}, label: ''});
  };

  const handlePress = ({label: resultsLabel, value}: SearchResultsType) => {
    setShowResults(false);
    setInputValue(resultsLabel);
    handleSelect({value, label: resultsLabel});
  };

  const renderTypeaheadResults = () => {
    if (
      !showResults ||
      inputValue !== debouncedInputValue ||
      inputValue.length < 3
    ) {
      return;
    }

    if (loading) return <ActivityIndicator color="blue" />;

    return searchResults.length ? (
      searchResults.map(({label: resultsLabel, value}, i) => (
        <ListItem
          key={`${resultsLabel}-${i}`}
          bottomDivider
          topDivider
          onPress={() => handlePress({label: resultsLabel, value})}>
          {resultsLabel}
        </ListItem>
      ))
    ) : (
      <Text>No Results</Text>
    );
  };

  return (
    <View>
      <Input
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder={placeholder}
        label={label}
      />
      <ScrollView>{renderTypeaheadResults()}</ScrollView>
    </View>
  );
};

export default TypeAhead;
