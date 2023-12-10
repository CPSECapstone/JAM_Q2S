package data;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.core.io.ClassPathResource;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.stream.Collectors;

public class ParseSemesterCSV {

	public static void main(String[] args) {
		List<SemesterCoursesCSVModel> records = parseCSV();

		// Process the CSV records as needed
		for (SemesterCoursesCSVModel model : records) {
			// You can now access fields of your model
			System.out.println(model);
		}
	}

	private static List<SemesterCoursesCSVModel> parseCSV() {
		try {
			// Load the CSV file from the resources folder (adjust the path as needed)
			ClassPathResource resource = new ClassPathResource("CSCSemesterCourses.csv");

			try (BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()))) {
				// Parse the CSV content
				CSVReader csvReader = new CSVReader(reader);
				List<SemesterCoursesCSVModel> records = csvReader.readAll().stream()
						.skip(1) // Skip header row
						.map(data -> new SemesterCoursesCSVModel(data[0], data[1], data[2], data[3], data[4], data[5], data[6]))
						.collect(Collectors.toList());

				return records;

			} catch (CsvException | IOException e) {
				e.printStackTrace(); // Handle the exception appropriately
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
