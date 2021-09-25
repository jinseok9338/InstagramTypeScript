/* eslint-disable arrow-body-style */
import PlacesAutocomplete from 'react-places-autocomplete';

interface placeAutoCompleteProps {
  residence: string;
  setResidence: React.Dispatch<React.SetStateAction<string>>;
}

const PlaceAutoComplete = ({
  residence,
  setResidence,
}: placeAutoCompleteProps) => {
  return (
    <PlacesAutocomplete
      value={residence}
          onChange={(value) => setResidence(value)}
          onSelect={(address: string, placeID: string) => setResidence(address)}
    >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                  <input
                      {...getInputProps({
                          placeholder: 'Search Places ...',
                          className: 'location-search-input',
                      })}
                  />
                  <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                          const className = suggestion.active
                              ? 'suggestion-item--active'
                              : 'suggestion-item';
                          // inline style for demonstration purpose
                          const style = suggestion.active
                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
                          return (
                              <div
                                  {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style,
                                  })}
                              >
                                  <span>{suggestion.description}</span>
                              </div>
                          );
                      })}
                  </div>
              </div>
          )}
    </PlacesAutocomplete>
  );
};

export default PlaceAutoComplete;
