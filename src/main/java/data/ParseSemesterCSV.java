package data;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.CSVReader;

import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Iterator;

public class ParseSemesterCSV {
	private static final String csv_filename1 = "src/main/resources/CSCSemesterCourses.csv";
	private static final String csv_filename2 = "src/main/resources/cs_q2s_mapping.csv";

	public static void main(String[] args) throws IOException{
		try(
				Reader reader1 = Files.newBufferedReader(Paths.get(csv_filename1), StandardCharsets.UTF_8);
				Reader reader2 = Files.newBufferedReader(Paths.get(csv_filename2));
				){
			CSVReader csvReader1 = new CSVReader(reader1);
			CSVReader csvReader2 = new CSVReader(reader2);
			CsvToBean<SemesterCoursesCSVModel> csvToBean1 = new CsvToBeanBuilder(csvReader1)
					.withType(SemesterCoursesCSVModel.class)
					.build();
			CsvToBean<QToSMappingCSVModel> csvToBean2 = new CsvToBeanBuilder(csvReader2)
					.withType(QToSMappingCSVModel.class)
					.build();

			Iterator<SemesterCoursesCSVModel> csvSemesterCourseIterator = csvToBean1.iterator();
			Iterator<QToSMappingCSVModel> csvQtoSMappingIterator = csvToBean2.iterator();

			while(csvSemesterCourseIterator.hasNext()){
				SemesterCoursesCSVModel semCourse = csvSemesterCourseIterator.next();
				System.out.println(semCourse.toString());
			}

			while(csvQtoSMappingIterator.hasNext()){
				QToSMappingCSVModel qToSMap = csvQtoSMappingIterator.next();
				System.out.println(qToSMap.toString());
			}

		}
		catch (IOException e) {
			e.printStackTrace();
		}
	}
}
