import { updateAutoClone} from '../Services/autoclone/auto-clone-service';
export const action = async ({ request }) => {
    try {
      if (request.method === 'PUT') {
        const formData = new URLSearchParams(await request.text());
        const autoCloneData = {
          _id: formData.get('_id'),
          projectId: formData.get('projectId'),
          periodType: formData.get('periodType'),
          repeat: formData.get('repeat'),
          endOnDate: formData.get('endOnDate'),
          endAfterOccurances: formData.get('endAfterOccurances'),
          endNever: formData.get('endNever'),
          monthlyType: formData.get('monthlyType'),
          day: formData.get('day'),
          repeatOnDateValue: formData.get('repeatOnDateValue'),
          monthRepeatOnDayValue: formData.get('monthRepeatOnDayValue'),
          monthRepeatOnDayValueOccurances: formData.get('monthRepeatOnDayValueOccurances'),
          startDate: formData.get('startDate'),
        };
  
        const { response, err } = await updateAutoClone(autoCloneData);
        
        if (err) {
          console.error('Error updating auto clone:', err);
          return json({ error: 'Failed to update auto clone' }, { status: 500 });
        }
  
        return redirect('/'); 
      } else {
        return json({ error: 'Invalid request method.' }, { status: 400 });
      }
    } catch (error) {
      console.error('Error processing action:', error);
      return json({ error: 'Internal server error.' }, { status: 500 });
    }
  };