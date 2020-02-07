import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f1f3',
    },
    CardScrollView: {
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
        width: '90%',
        minHeight: '85%',
        height: '85%',
        maxHeight: '85%',
    },
    CardContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 1800,
        padding: 15
    },
    PageOne: {
        minHeight: 600,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    HeadingText: {
        color: '#000000',
        fontWeight: '600',
        fontSize: 24,
    },
    CoverContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
    },
    Cover: {
        width: 140,
        height: '100%',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#000000',
        marginHorizontal: 5,
    },
    BackCover: {
        width: 140,
        height: 220,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#000000',
        marginHorizontal: 5,
    },
    ImageHolder: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#000000',
        backgroundColor: '#F1F1F1',
    },
    NextSectionButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        marginTop: 10
    },
    PreviousSectionButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        marginBottom: 5
    },
    PageTwo: {
        minHeight: 580,
        width: '100%',
        alignItems: 'center'
    },
    FormGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '45%',
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        height: 50,
        padding: 5,
        paddingBottom: -6,
        marginTop: 5,
        marginBottom: 5,
    },
    Row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    FormGroupColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        height: 54,
        padding: 5,
        marginTop: 8,
        marginBottom: 8,
    },
    PageThree: {
        minHeight: 580,
        width: '100%',
        alignItems: 'center'
    },
    PostBookButton: {
        width: 120,
        height: 45,
        backgroundColor: '#ff8c00',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
        borderRadius: 10
    },
    PostBookText: {
        fontSize: 20,
        color: '#FFFFFF',
    }
});
